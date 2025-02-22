import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import router from './router.js'
import App from './App.vue'

import './style/main.css' // app overall custom style
import '../common/msw.js' // msw
import '../common/pwa.js' // pwa
import createSentry from '../common/sentry.js' // sentry

import '@es-labs/esm/bwc-loading-overlay.js' // our own web components

import { version } from '../package.json'
console.log(`V${version}`)

const app = createApp(App)
createSentry(app, router) // add or remove your post createApp code here...
app.use(createPinia()) // state management

// NOSONAR
// https://zhuanlan.zhihu.com/p/135280049
// app.config.isCustomElement = (tag) => tag.startsWith('bwc-') || tag.startsWith('vcxwc-')

// avoid using provide & inject - reduce tech footprint
// app.use(createPinia()) // state management
app.use(router) // routing
app.use(Antd)

app.mount('#app')
