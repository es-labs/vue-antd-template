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
      :scroll="{ x: table.scrollX, y: tableHeight }"
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
      <template #bodyCell="{ column, text, record }">
        <template v-if="column?.ui?.link">
          <div @click="(e) => onLinkClick(e, column, record)">{{ column.ui.link.childTbl }}</div>
        </template>
      </template>
    </a-table>
    <a-drawer title="Filters" :width="512" :open="filterShow" :body-style="{ paddingBottom: '80px' }" @close="filterClose" placement="left">
      <a-form layout="vertical">
        <a-form-item v-for="(filter, index) of table.filters" :key="index">
          <a-input-group compact>
            <a-select style="width: 125px" placeholder="Column" v-model:value="filter.col">
              <a-select-option v-for="col of table.filterCols" :key="col.value" :value="col.value">{{ col.label }}</a-select-option>
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
      <div class="t4t-drawer">
        <a-button type="primary" @click="filterApply">Apply</a-button>
      </div>
    </a-drawer>
    <a-drawer :title="formMode" :width="480" :open="!!formMode" :body-style="{ paddingBottom: '80px' }" @close="formClose">
      <a-form layout="vertical" :model="table.formData" :rules="table.formRules">
        <template v-for="(colObj, col) in table.formCols" :key="col">
          <a-form-item :label="colObj.title" v-if="colShow(colObj)">
            <a-textarea v-if="colUiType(colObj, 'textarea')" v-model:value="table.formData[col]" v-bind="table.formColAttrs[col]" />
            <a-select v-else-if="colUiType(colObj, 'select')" v-model:value="table.formData[col]" v-bind="table.formColAttrs[col]" />
            <a-input v-else v-model:value="table.formData[col]" v-bind="table.formColAttrs[col]"/>
          </a-form-item>
        </template>
        <!-- TBD single autocomplete ? -->
        <!-- TBD multi autocomplete ? -->
        <!-- TBD multi select -->
        <!-- TBD date & time -->
        <!-- TBD date -->
        <!-- TBD time -->
      </a-form>
      <div class="t4t-drawer">
        <a-button style="margin-right: 8px" @click="formClose">Cancel</a-button>
        <a-button style="margin-right: 10px" type="primary" @click="formSubmit">Submit</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>
// TODO
// 1. fix table size
// 2. fix add/edit box layout
// 3. clear all filters button
// filters, create, delete (multi select), import, export to CSV? upload
// i18n

import { reactive, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { notification } from 'ant-design-vue'
import * as t4tFe from '@es-labs/esm/t4t-fe'
import { http } from '/src/plugins/fetch'
import { useMainStore } from '/src/store'
import { useRouter } from 'vue-router'

const filterTemplate = { col: '', op: '=', andOr: 'and', val: '' }
const DEFAULT_PAGE_SIZE = 10

export default {
  name: 'T4t',
  props: ['tableName', 'filterKeys', 'filterVals'],
  components: {
    CloseOutlined
  },
  setup(props, context) {
    const store = useMainStore()
    const router = useRouter()
    // const loading = store.loading

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
      formRules: {},
      formCols: {},
      formColAttrs: {}, // attributes for your inputs
      scrollX: 1800,
    })

    // Filters
    const filterShow = ref(false)
    const filterOpen = () => (filterShow.value = true)
    const filterClose = () => (filterShow.value = false)
    const filterApply = async () => {
      if (store.loading === false) {
        store.loading = true
        await find()
        store.loading = false
      }
    }
    const filterAdd = () => table.filters.push({ ...filterTemplate })
    const filterDelete = (index) => table.filters.splice(index, 1)

    // Deletion
    const deleteItems = async () => {
      console.log('TBD deleteItems', rowSelection.selectedRowKeys)
    }

    // Add / Edit Form
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
        console.log('asdhgf', mode, cols)
        for (let col of cols) {
          table.formCols[col.dataIndex] = col
          table.formData[col.dataIndex] = mode === 'add' ? '' : rv[col.dataIndex] // get the data
          table.formColAttrs[col.dataIndex] = {
            ...col.ui?.attrs,
            // TBD... permissions for adding and editing...
            disabled: (mode === 'add' && col.add === 'readonly') || (mode === 'edit' && col.edit === 'readonly'),
            required: (mode === 'add' && col.add === 'required') || (mode === 'edit' && col.edit === 'required'),
          }
          if (col?.ui?.tag == 'select') {
            console.log('yyyy', table.formColAttrs[col.dataIndex], table.formData[col.dataIndex])
          }
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
        // console.log('columns', table.columns, 'results', results, total)
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
      t4tFe.setTableName(props.tableName)

      if (store.loading === false) {
        store.loading = true
        try {
          table.config = await t4tFe.getConfig()
        } catch (e) {
          console.log('table config error', e.toString())
        }
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
        table.filterCols = table.columns.filter((col) => col.filter).map((col) => ({ value: col.dataIndex, label: col.title }))
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

    //responsive table height
    const tableHeight = ref(0);

    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const offsetHeight = 320; // Adjust based on your layout (headers, footers, etc.)
      tableHeight.value = windowHeight - offsetHeight;
    };

    onMounted(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", handleResize);
    });

    return {
      colShow: (val) => (formMode.value === 'add' && val.add !== 'hide') || (formMode.value === 'edit' && val.edit !== 'hide'),
      colUiType: (val, uiType) => val?.ui?.tag === uiType,
      onLinkClick: (event, column, record) => {
        // console.log(column, record)
        // console.log(router.push)
        router.push({
          path: '/t4ta',
          name: 'T4ta',
          query: { fkeys: 'aa,bb', fvals: '11,22' },
          params: { table: 'student_subject' }
        })
        event.stopPropagation()
        // send to child table
      },
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
      formMode, formOpen, formClose, formSubmit,

      // others
      rowSelection,
      deleteItems,

      //responsive table height
      tableHeight,
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

.t4t-drawer {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 0px 10px 0px;
  background: #fff;
  text-align: right;
  z-index: 1;
}
</style>
