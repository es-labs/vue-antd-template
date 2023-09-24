// MSW - https://www.vuemastery.com/blog/mock-service-worker-api-mocking-for-vuejs-development-testing
// run once: npx msw init public/
// NOTE: if you touch MSW and it related code, need to do empty cache and hard reload
import { worker } from '../web-sample/mocks/browser.js'

export default async function prepare() {
  if (import.meta.env.MODE === 'mocked') {
    // const { worker } = await import('../web-sample/mocks/browser')
    console.log('MSW starting', worker)
    return await worker.start({
      onUnhandledRequest(request, print) {
        // Do not print warnings on unhandled requests to Sentry.
        if (request.url.hostname.includes('sentry.io')) return
        // Print the regular MSW unhandled request warning otherwise.
        // print.warning()
        console.log('[MSW]', request.method, request.url.pathname)
      }
    })
  }
}

prepare()
  .then(() => console.log('MSW prepared'))
  .catch((err) => console.log(err)) // MSW
