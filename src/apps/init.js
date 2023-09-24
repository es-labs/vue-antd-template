import './common/msw.js' // msw
import './common/pwa.js' // pwa

import createSentry from './common/sentry.js' // sentry

export default function postCreateApp(app, router) {
  // add or remove your post createApp code here...
  createSentry(app, router)
}
