<template>
  <div>
    <div class="table-operations">
      <a-button @click="filterOpen">Filter</a-button>
      <a-button v-if="table?.config?.create" @click="() => formOpen(null)">Create</a-button>
      <a-button v-if="table?.config?.delete !== 0" @click="deleteItems">Delete</a-button>
      <a-button v-if="table?.config?.import" @click="importCsv">Import</a-button>
      <a-button v-if="table?.config?.export" @click="exportCsv">Export</a-button>
    </div>
    <a-table
      :columns="table.columns"
      :data-source="table.data"
      :pagination="table.pagination"
      :scroll="table.scroll"
      :loading="table.loading"
      size="small"
      @change="handleTableChange"
      :row-key="'__key'"
      :customRow="customRow"
      :customHeaderRow="customHeaderRow"
      :row-selection="rowSelection"
    >
      <!-- <template #action="item">
        <a-button @click="() => console.log(item)">{{ item.text }}</a-button>
      </template> -->
    </a-table>
    <a-drawer title="Filters" :width="512" :open="filterShow" :body-style="{ paddingBottom: '80px' }" @close="filterClose" placement="left">
      <a-form layout="vertical">
        <a-form-item v-for="(filter, index) of table.filters" :key="index">
          <a-input-group compact>
            <a-select style="width: 125px" placeholder="Column" v-model:value="filter.col">
              <a-select-option v-for="col of table.filterCols" :key="col" :value="col">{{ col }}</a-select-option>
            </a-select>
            <a-select style="width: 75px" placeholder="Operation" v-model:value="filter.op">
              <a-select-option v-for="op of table.filterOps" :key="op" :value="op">{{ op }}</a-select-option>
            </a-select>
            <a-input style="width: 125px" placeholder="Value" v-model:value="filter.val" />
            <a-select style="width: 75px" placeholder="And Or" v-model:value="filter.andOr">
              <a-select-option v-for="andOr of table.filterAndOr" :key="andOr" :value="andOr">{{ andOr }}</a-select-option>
            </a-select>
            <a-button type="primary" @click="() => filterDelete(index)">
              <template #icon><CloseOutlined /></template>
            </a-button>
          </a-input-group>
        </a-form-item>
      </a-form>
      <a-button :disabled="table.filters.length > 9" style="margin-bottom: 8px" @click="filterAdd">Add Filter</a-button>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button type="primary" @click="filterApply">Apply</a-button>
      </div>
    </a-drawer>
    <a-drawer :title="formMode" :width="480" :open="!!formMode" :body-style="{ paddingBottom: '80px' }" @close="formClose">
      <a-form layout="vertical" :model="table.formData" :rules="table.formRules">
        <template v-for="(colObj, col) in table.config.cols" :key="col">
          <a-form-item :label="colObj.label" v-if="colShow(colObj)">
            <a-textarea
              v-if="colUiType(colObj, 'textarea')"
              v-model:value="table.formData[col]"
              :rows="4"
              :required="colRequired(colObj)"
              :disabled="colReadonly(colObj)"
            />
            <a-input v-else v-model:value="table.formData[col]" :type="colUiInputType(colObj)" :required="colRequired(colObj)" :disabled="colReadonly(colObj)" />
          </a-form-item>
        </template>
        <!-- TBD single autocomplete ? -->
        <!-- TBD multi autocomplete ? -->
        <!-- TBD single select -->
        <!-- TBD multi select -->
        <!-- TBD date & time -->
        <!-- TBD date -->
        <!-- TBD time -->
        <!--
        <a-form-item label="Owner" name="owner">
          <a-select placeholder="Please a-s an owner" v-model:value="form.form.owner">
            <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
            <a-select-option value="mao">Maomao Zhou</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="DateTime" name="dateTime">
          <a-date-picker v-model:value="form.form.dateTime" style="width: 100%" :get-popup-container="trigger => trigger.parentNode" />
        </a-form-item>
        -->
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1
        }"
      >
        <a-button style="margin-right: 8px" @click="formClose">Cancel</a-button>
        <a-button type="primary" @click="formSubmit">Submit</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
// TODO
// filters
// update, create, delete (multi select), export to CSV?
// attributes
// i18n

import { reactive, ref, computed, watch, onMounted } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import * as t4tFe from '@es-labs/esm/t4t-fe'
import { http } from '/src/plugins/fetch'
import { useMainStore } from '/src/store'

const filterTemplate = {
  col: '',
  op: '=',
  andOr: 'and',
  val: ''
}

const DEFAULT_PAGE_SIZE = 10

export default {
  components: {
    CloseOutlined
  },
  setup() {
    const store = useMainStore()
    const loading = store.loading

    // table information
    const table = reactive({
      scroll: { x: 1800, y: 240 },
      pagination: { pageSize: DEFAULT_PAGE_SIZE, total: 0, current: 1 }, // start at page 1, 8 records per page
      sorter: null, // single sort only

      filters: [],
      filterCols: [],
      filterOps: ['like', '=', '!=', '>=', '>', '<', '<='], // isNull, isEmpty
      filterAndOr: ['and', 'or'],

      keyCols: [],
      data: [],
      loading: false,
      config: null,
      columns: [],

      formKey: null,
      formData: {},
      formRules: {}
    })

    const form = reactive({
      rules: {
        name: [{ required: true, message: 'Please enter user name' }],
        owner: [{ required: true, message: 'Please select an owner' }],
        type: [{ required: true, message: 'Please choose the type' }],
        approver: [{ required: true, message: 'Please choose the approver' }],
        dateTime: [{ required: true, message: 'Please choose the dateTime', type: 'object' }],
        description: [{ required: true, message: 'Please enter url description' }]
      }
    })

    const filterShow = ref(false)
    const filterOpen = () => (filterShow.value = true)
    const filterClose = () => (filterShow.value = false)
    const filterApply = async () => {
      console.log('aa', table.filters)
      console.log('bb', table.filterCols)
      // filterShow.value = false
      if (store.loading === false) {
        store.loading = true
        await find()
        store.loading = false
      }
    }
    const filterAdd = () => table.filters.push({ ...filterTemplate })
    const filterDelete = (index) => table.filters.splice(index, 1)

    const deleteItems = async () => {
      console.log('deleteItems', rowSelection.selectedRowKeys)
    }

    const formMode = ref(false) // false, add or edit
    const formOpen = async (item) => {
      table.formData = {}
      table.formKey = null
      let rv = {}
      const mode = item ? 'edit' : 'add'

      try {
        if (mode === 'edit') {
          if (table.loading) return
          table.loading = true
          rv = await t4tFe.findOne(item.__key)
          table.formKey = item.__key
          table.loading = false
        }
        const cols = table.columns.filter((col) => col[mode] !== 'hide')
        for (let col of cols) {
          // console.log('col', col)
          table.formData[col.dataIndex] = mode === 'add' ? '' : rv[col.dataIndex]
        }
        // console.log(table.formData)
      } catch (e) {
      }
      formMode.value = mode
    }
    const formClose = () => (formMode.value = false)
    const formSubmit = async () => {
      // console.log(table.formKey, table.formData)
      if (store.loading === false) {
        store.loading = true
        const message = formMode.value === 'add' ? 'Add' : 'Update'
        const duration = 3 // seconds
        try {
          if (formMode.value === 'add') {
            await t4tFe.create(table.formData)
          } else {
            await t4tFe.update(table.formKey, table.formData)
          }
          await find()
          notification.open({ message, duration, description: 'Success' })
        } catch (e) {
          console.log('t4t submit error', e.toString())
          notification.open({ message, duration, description: 'Error' })
        }
        store.loading = false
      }
      formMode.value = false
    }
    const rowSelection = reactive({
      selectedRowKeys: [],
      // Check here to configure the default column
      onChange: (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        rowSelection.selectedRowKeys = selectedRowKeys
      }
    })
    // const hasSelected = computed(() => state.selectedRowKeys.length > 0);

    const find = async () => {
      if (table.loading) return
      table.loading = true
      try {
        const { results, total } = await t4tFe.find(table.filters, null, table.pagination.current, table.pagination.pageSize)
        // console.log('columns', table.columns)
        // console.log('results', results, total)
        table.data = results
        table.pagination.total = total
        // console.log(table.filters)
      } catch (e) {
        alert('Error find' + e.toString())
      }
      table.loading = false
    }

    const getRowKey = (record) => {
      return table.keyCols.map(keyCol => record[keyCol]).join('|')
    }

    onMounted(async () => {
      t4tFe.setFetch(http)
      t4tFe.setTableName('student')

      if (store.loading === false) {
        store.loading = true
        table.config = await t4tFe.getConfig()
        console.log('TABLE CONFIG', table.config)
        for (const key in table.config.cols) {
          const val = table.config.cols[key]
          if (val.multiKey || val.auto === 'pk') table.keyCols.push(key)

          const col = {
            title: val.label,
            dataIndex: key,
            filter: val.filter,
            sorter: val.sort,
            __type: val.type || 'text', // aka type
            add: val.add,
            edit: val.edit,
            ui: val.ui,
          }
          if (!val.hide) table.columns.push(col)
        }
        table.filterCols = table.columns.filter((col) => col.filter).map((col) => col.dataIndex)
        await find()
        store.loading = false
      }
    })

    const handleTableChange = async (pagination, filters, sorter) => {
      console.log('handleTableChange', pagination, filters, sorter)
      table.pagination = { ...pagination }
      table.sorter = { ...sorter }
      table.filters = { ...filters } // use our own filters instead
      if (store.loading === false) {
        store.loading = true
        await find()
        store.loading = false
      }
    }

    const customRow = (record) => {
      return {
        // xxx, // props
        onClick: (event) => {
          // console.log('onClick', event, record)
          formOpen(record)
        }, // click row
        onDblclick: (event) => console.log('dblCLick'), // double click row
        // onContextmenu: (event) => {}  // right button click row
        // onMouseenter: (event) => {}   // mouse enter row
        // onMouseleave: (event) => {}   // mouse leave row
      }
    }
    const customHeaderRow = (column) => {
      return {
        // onClick: () => console.log(column), // click header row
      }
    }

    const importCsv = () => {}
    const exportCsv = () => {}

    return {
      colShow: (val) => (formMode.value === 'add' && val.add !== 'hide') || (formMode.value === 'edit' && val.edit !== 'hide'),
      colReadonly: (val) => (formMode.value === 'add' && val.add === 'readonly') || (formMode.value === 'edit' && val.edit === 'readonly'),
      colRequired: (val) => (formMode.value === 'add' && val.add === 'required') || (formMode.value === 'edit' && val.edit === 'required'),
      colUiType: (val, uiType) => val?.ui?.tag === uiType,
      colUiInputType: (val) => val?.ui?.attrs?.type || 'text',
      table,
      handleTableChange,
      getRowKey,
      customRow,
      customHeaderRow,

      // filters
      filterShow, filterOpen, filterClose, filterAdd, filterApply, filterDelete,

      // csv
      importCsv, exportCsv,

      // forms
      form, // TOREMOVE
      formMode, formOpen, formClose, formSubmit,

      // others
      rowSelection,
      deleteItems
    }
  }
}
</script>

<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
