<template>
  <div>
    <bwc-loading-overlay v-if="loading"></bwc-loading-overlay>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue'
import { useMainStore } from '/src/store'
export default {
  name: 'LayoutPublic',
  setup(props, context) {
    const store = useMainStore()
    onMounted(() => console.log('PUBLIC mounted!'))
    onUnmounted(() => console.log('PUBLIC unmounted'))
    return {
      loading: computed(() => store.loading)
    }
  }
}
</script>
