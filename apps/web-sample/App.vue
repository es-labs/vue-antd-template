<template>
  <component :is="$route.meta.layout || (storeUser ? 'layout-secure' : 'layout-public')"></component>
</template>

<script>
// :key="$route.fullPath" // this is causing problems
import layoutPublic from './layouts/Public.vue' // you can change this to your own layout
import layoutSecure from './layouts/Secure.vue' // as above

import { computed } from 'vue'
import { useMainStore } from './store.js'

import { http } from '../common/plugins/fetch.js'
import { provideI18n } from '../common/plugins/i18n.js'

export default {
  components: {
    'layout-public': layoutPublic, // store.user determines if public or secure
    'layout-secure': layoutSecure
  },

  setup(props, context) {
    const store = useMainStore()
    const storeUser = store.user
    const logout = async () => {
      await store.doLogin({ forced: true })
    }
    http.setOptions({ forceLogoutFn: logout })

    // set i18n
    provideI18n({
      locale: 'en',
      messages: {
        en: { sign_in: 'Sign In (en)' },
        id: { sign_in: 'Masuk (id)' }
      }
    })

    return {
      storeUser // computed
    }
  }
}
</script>
