<template>
  <div>
    <h1>Callback</h1>
    <p>Can be for enterprise SSO such as SAML or OIDC</p>
    <p>Hash = {{ hash }}</p>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { INITIAL_SECURE_PATH } from '/config.js'
import { useMainStore } from '/src/store'

export default {
  name: 'CallBack',
  setup(props, context) {
    const route = useRoute()
    const store = useMainStore()
    const router = useRouter()

    const hash = ref('No Hash Found')

    const _setMockUser = async () => {
      const decoded = {
        id: 'Aaa',
        groups: 'MyGroup,AnotherGroup'
      }
      // store user
      await store.doLogin(decoded)
    }

    onMounted(async () => {
      // NOSONAR const { hash, href, port, hostname, protocol, ...etc } = window.location
      console.log('Callback mounted!', route.hash, route) // deal with hashes here if necessary
      hash.value = route.hash.substring(1) // <access_token>;<refresh_token>;<groups JSON string>
      // verify first, if ok, do login, else send to forbidden // split(';')

      if (hash.value === 'mocked') {
        alert('re-directing to callback')
        _setMockUser()
        router.push(INITIAL_SECURE_PATH) // still needed or does _setUser() handle this? TODO!
      }
    })

    return {
      hash
    }
  }
}
</script>
