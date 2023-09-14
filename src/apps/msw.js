// MSW - https://www.vuemastery.com/blog/mock-service-worker-api-mocking-for-vuejs-development-testing
// run once: npx msw init public/
if (import.meta.env.MODE === 'mocked' && !window.__msw_started) {
  console.log('using MSW')
  window.__msw_started = true
  const { worker } = await import('./web-sample/mocks/browser')
  worker.start({
    onUnhandledRequest(request, print) {
      //aa
      // Do not print warnings on unhandled requests to Sentry.
      if (request.url.hostname.includes('sentry.io')) return
      // Print the regular MSW unhandled request warning otherwise.
      // print.warning()
      console.log('[MSW]', request.method, request.url.pathname)
    }
  })
}
