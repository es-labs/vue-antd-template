<template>
  <a-result status="403" title="403" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <a-button type="primary" @click="goHome">Back Home</a-button>
    </template>
  </a-result>
</template>

<script>
import { useRouter } from 'vue-router'
import { useMainStore } from '../store.js'

const { VITE_INITIAL_SECURE_PATH, VITE_INITIAL_PUBLIC_PATH } = import.meta.env

export default {
  name: 'NotAllowed',
  setup(props, context) {
    const router = useRouter()
    const store = useMainStore()
    const goHome = () => router.push(VITE_INITIAL_SECURE_PATH)
    // const goHome = () => router.push(store.user ? VITE_INITIAL_SECURE_PATH : VITE_INITIAL_PUBLIC_PATH)
    return {
      goHome
    }
  }
}
</script>
