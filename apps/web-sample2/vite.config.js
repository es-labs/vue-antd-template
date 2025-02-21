// import.meta is undefined, process.env is not populated with custom values
import vue from '@vitejs/plugin-vue'
import path from 'path'
import * as dotenv from 'dotenv'

export default ({ command, mode }) => {
  console.log(__dirname)
  const env = dotenv.config({ path: path.join(__dirname, '.env.' + mode) }).parsed
  // console.log(__dirname, mode, command, env) // command = serve, build
  if (!env) return console.error(`Vite Error: env undefined for mode: ${mode}`)
  return {
    define: {
      __VUE_PROD_DEVTOOLS__: false
    },
    base: env.BASE_PATH || '/', // set to '/vite' for dev:build, '/' otherwise
    root: 'web-sample2',
    // publicDir: 'public',
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('bwc-') || tag.startsWith('vcxwc-')
          }
        }
      })
    ],
    server: {
      host: '127.0.0.1',
      port: 8081
    }
  }
}
