import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'

import router from './router.js'
import App from './App.vue'

import '@es-labs/esm/bwc-loading-overlay.js' // our own web components

import postCreateApp from './apps/init' // initialize - must only be called once

const app = createApp(App)
postCreateApp(app, router)
// NOSONAR
// https://zhuanlan.zhihu.com/p/135280049
// app.config.isCustomElement = (tag) => tag.startsWith('bwc-') || tag.startsWith('vcxwc-')

// avoid using provide & inject - reduce tech footprint
// app.use(createPinia()) // state management
app.use(router) // routing
app.use(Antd)

app.mount('#app')
