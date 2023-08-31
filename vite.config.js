// import.meta is undefined, process.env is not populated with custom values
import vue from '@vitejs/plugin-vue'
export default ({ command, mode }) => {
  const path = require('path')
  const env = require('dotenv').config({ path: path.join(__dirname, '.env.' + mode) }).parsed

  // console.log(__dirname, mode, command, env) // command = serve, build

  return {
    base: env.BASE_PATH || '/', // set to '/vite' for dev:build, '/' otherwise
    // build: {
    //   sourcemap: true,
    //   rollupOptions: {
    //     external: [ 'react' ] // ignore react stuff
    //     input: { main: path.resolve(__dirname, 'index.html') }
    //   }
    // },
    optimizeDeps: {
      include: ['leaflet']
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('bwc-') || tag.startsWith('vcxwc-')
          }
        }
      })
    ],
    resolve: {
      alias: {
        // https://github.com/vitejs/vite/issues/279#issuecomment-636110354
        // '@': path.resolve(__dirname, 'src') // import aa from '@/esm/aaa.js',
        // '/@es-labs/esm': require('path').join(__dirname, '@es-labs', 'esm')
      }
    },
    server: {
      host: '127.0.0.1',
      port: 8080
    }
  }
}
