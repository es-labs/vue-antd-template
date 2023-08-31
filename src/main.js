import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'

// Sentry
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'
import router from './router.js'
import App from './App.vue'

// pwa
import './pwa-init.js'

// our own web components
import '@es-labs/esm/bwc-loading-overlay.js'

// NEW MSW - https://www.vuemastery.com/blog/mock-service-worker-api-mocking-for-vuejs-development-testing
// npx msw init public/ ?
// if (process.env.NODE_ENV === 'development') {
//   const { worker } = require('./mocks/browser')
//   worker.start()
// }

const app = createApp(App)
// NOSONAR
// https://zhuanlan.zhihu.com/p/135280049
// app.config.isCustomElement = (tag) => tag.startsWith('bwc-') || tag.startsWith('vcxwc-')

Sentry.init({
  app,
  dsn: 'https://3326314072fc4706bf8492e292b674b2@o406131.ingest.sentry.io/5869551',
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//]
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

// Sentry.captureMessage('Something went wrong Vue Vute' + Date.now())

const theme = 'dark'
// const ThemeSymbol = Symbol()
app.provide('AppTheme', theme) // provide & inject
app.use(createPinia()) // state management
app.use(router) // routing
app.use(Antd)

app.mount('#app')
