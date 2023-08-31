<template>
  <div class="super-center-parent">
    <a-result title="Welcome To JS Dashboard" sub-title="Your one-stop web portal for all things web">
      <template #icon>
        <a-image :width="150" src="https://via.placeholder.com/150x150.png?text=A+Logo" />
      </template>
      <template #extra>
        <a-button type="primary" html-type="button" @click="login">Mock Login</a-button>
        <a-button type="primary" html-type="button" @click="loginCallback">Mock Login + Callback</a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { INITIAL_SECURE_PATH } from '/config.js'
import { useMainStore } from '/src/store'

export default {
  setup() {
    const store = useMainStore()
    const route = useRoute()
    const router = useRouter()

    onUnmounted(() => console.log('signInFast unmounted'))
    onMounted(async () => {
      console.log('signInFast mounted!', route.hash) // deal with hashes here if necessary
    })

    const _setMockUser = async () => {
      const decoded = {
        id: 'Aaa',
        groups: 'MyGroup,AnotherGroup'
      }
      // store user
      await store.doLogin(decoded)
    }
    const login = async () => {
      _setMockUser()
      router.push(INITIAL_SECURE_PATH) // still needed or does _setMockUser() handle this? TBD!
    }

    const loginCallback = async () => {
      window.location.assign('/callback#mocked')
    }

    return {
      login,
      loginCallback
    }
  }
}
</script>

<style>
.super-center-parent {
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
