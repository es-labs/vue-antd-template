import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'

import * as Sentry from '@sentry/vue' // Sentry

import router from './router.js'
import App from './App.vue'

import './apps/msw.js' // msw
import './pwa-init.js' // pwa
import '@es-labs/esm/bwc-loading-overlay.js' // our own web components

const app = createApp(App)
// NOSONAR
// https://zhuanlan.zhihu.com/p/135280049
// app.config.isCustomElement = (tag) => tag.startsWith('bwc-') || tag.startsWith('vcxwc-')

// sentry
const { VITE_SENTRY_DSN } = import.meta.env
if (VITE_SENTRY_DSN) {
  Sentry.init({
    app,
    dsn: VITE_SENTRY_DSN,
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
}
// Sentry.captureMessage('Something went wrong Vue Vute' + Date.now())

// avoid using provide & inject - reduce tech footprint
app.use(createPinia()) // state management
app.use(router) // routing
app.use(Antd)

app.mount('#app')
