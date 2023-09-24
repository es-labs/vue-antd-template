import './common/msw.js' // msw
import './common/pwa.js' // pwa

import createSentry from './common/sentry.js' // sentry

export default function postCreateApp(app, router) {
  createSentry(app, router)
}
