// import.meta is undefined, process.env is not populated with custom values
import path from 'path'
import * as dotenv from 'dotenv'

export default ({ command, mode }) => {
  const env = dotenv.config({ path: path.join(__dirname, '.env.' + mode) }).parsed
  if (!env) return console.error(`Vite Error: env undefined for mode: ${mode}`)
  return {
    define: {
      __VUE_PROD_DEVTOOLS__: false
    },
    base: env.BASE_PATH || '/', // set to '/vite' for dev:build, '/' otherwise
    root: 'web-sample2',
    server: {
      host: '127.0.0.1',
      port: 8081
    }
  }
}
