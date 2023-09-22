import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'

// Sentry
import * as Sentry from '@sentry/vue'
import router from './router.js'
import App from './App.vue'

// msw
import './apps/msw.js'

// pwa
import './pwa-init.js'

// our own web components
import '@es-labs/esm/bwc-loading-overlay.js'

const app = createApp(App)
// NOSONAR
// https://zhuanlan.zhihu.com/p/135280049
// app.config.isCustomElement = (tag) => tag.startsWith('bwc-') || tag.startsWith('vcxwc-')

Sentry.init({
  app,
  dsn: 'https://3326314072fc4706bf8492e292b674b2@o406131.ingest.sentry.io/5869551',
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
})

// Sentry.captureMessage('Something went wrong Vue Vute' + Date.now())

const theme = 'dark'
// const ThemeSymbol = Symbol()
app.provide('AppTheme', theme) // provide & inject
app.use(createPinia()) // state management
app.use(router) // routing
app.use(Antd)

app.mount('#app')
