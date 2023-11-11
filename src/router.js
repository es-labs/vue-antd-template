import { createRouter, createWebHistory } from 'vue-router'
import { useMainStore } from '/src/store'
import { BASE_URL, ROUTES, SECURE_ROUTES, PUBLIC_ROUTES, authGuard } from '/config.js'

for (const route of SECURE_ROUTES) {
  route.beforeEnter = authGuard
  route.meta = { requiresAuth: true, layout: 'layout-secure' }
}

for (const route of PUBLIC_ROUTES) {
  route.beforeEnter = authGuard
  route.meta = { requiresAuth: false, layout: 'layout-public' }
}

const routerHistory = createWebHistory(BASE_URL)

export const router = createRouter({
  history: routerHistory,
  routes: [
    ...PUBLIC_ROUTES, // authguard, requiresAuth: false, public-layout
    ...SECURE_ROUTES, // authguard, requiresAuth: true, secure-layout
    ...ROUTES // no authguard, no layout
  ]
})

// router.beforeEach((to) => { })
export default router
