<template>
  <a-layout>
    <bwc-loading-overlay v-if="loading"></bwc-loading-overlay>
    <a-back-top />
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :collapsed-width="0">
      <div class="sider-logo" />
      <a-menu class="sider-menu" theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <template v-for="route in mappedRoutes">
          <a-sub-menu v-if="route.submenu" :key="route.submenu" :title="toPascalCase(route.submenu)">
            <a-menu-item v-for="menu in subMenus[route.submenu]" :key="'sm-' + menu.path" @click="$router.push(menu)">{{ menu.name }}</a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="'m-' + route.path" @click="$router.push(route)">{{ route.name }}</a-menu-item>
        </template>
        <a-menu-item data-cy="logout" key="logout" @click="logout">Logout</a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <span>Demo App</span>
      </a-layout-header>
      <a-layout-content :style="{ overflowY: 'auto', margin: '16px 12px', padding: '16px', background: '#fff', height: 'calc(100vh - 96px)' }">
        <a-breadcrumb style="margin: 8px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
        </a-breadcrumb>
        <router-view :key="$route.fullPath"></router-view>
      </a-layout-content>
      <a-layout-footer hidden style="text-align: center">Ant Design ©2023</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
// :key="$route.fullPath" // this is causing problems
import { onMounted, onUnmounted, onBeforeUnmount, ref, reactive, computed } from 'vue'
import { useMainStore } from '/src/store'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { SECURE_ROUTES, onLogin, onLogout } from '/config.js'

import idleTimer from '@es-labs/esm/idle.js'

export default {
  name: 'LayoutSecure',
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined
  },
  setup(props, context) {
    const store = useMainStore()
    const loading = store.loading

    const mappedRoutes = reactive([])
    const subMenus = reactive({})

    const toPascalCase = (str) => {
      str = str.replace(/-\w/g, (x) => ` ${x[1].toUpperCase()}`)
      return str[0].toUpperCase() + str.substring(1, str.length)
    }

    onMounted(async () => {
      console.log('SECURE mounted!')
      idleTimer.timeouts.push({ time: 300, fn: () => alert('Idle Timeout Test'), stop: true })
      idleTimer.start()

      SECURE_ROUTES.filter((route) => route.meta.layout === 'layout-secure').forEach((route) => {
        if (!route.hidden) {
          const pathLen = route.path.split('/').length
          if (pathLen === 2 || pathLen === 3) {
            const submenu = pathLen === 3 ? route.path.split('/', 2)[1] : ''
            // console.log('submenu', route, '-', submenu, '-', pathLen)
            if (submenu) {
              if (!subMenus[submenu]) {
                // first time
                subMenus[submenu] = []
                mappedRoutes.push({ ...route, submenu: submenu })
              }
              subMenus[submenu].push({ ...route }) // add item
            } else {
              mappedRoutes.push({ ...route, submenu: '' }) // add item
            }
          }
        }
      })
      onLogin && onLogin()
    })
    onUnmounted(() => {
      console.log('SECURE unmounted')
    })
    onBeforeUnmount(() => {
      // close WS
      idleTimer.stop()
      onLogout && onLogout()
    })

    const logout = async () => {
      console.time('time-logout')
      store.loading = true
      await store.doLogin(null)
      store.loading = false
      console.timeEnd('time-logout')
    }
    return {
      loading: computed(() => store.loading),
      logout,
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      mappedRoutes,
      subMenus,
      toPascalCase
    }
  }
}
</script>

<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.site-layout .site-layout-background {
  background: #fff;
}

.ant-layout-sider-children {
  background-color: blue;
}

.ant-layout-sider-children .sider-logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  background-image: url('https://via.placeholder.com/168x32.png?text=A+Logo');
}

.ant-layout-sider-children .sider-menu {
  overflow-y: auto;
  height: calc(100vh - 64px);
}

.ant-menu {
  background-color: var(--blue-something) !important;
}

.ant-menu-item {
  background-color: var(--blue-something) !important;
}

/*
.ant-menu { background-color: gray; }
.ant-menu-dark.ant-menu-inline .ant-menu-sub.ant-menu-inline { background-color: red; }
.ant-menu-item, .ant-menu-item:hover { background-color: var(--blue-something); }
.ant-menu-item.ant-menu-item-active, .ant-menu-item.ant-menu-item-active:hover { background-color: orange; }
.ant-menu-item:not(.ant-menu-item-selected), .ant-menu-item:not(.ant-menu-item-selected):hover { background-color: pink; }
*/
</style>
