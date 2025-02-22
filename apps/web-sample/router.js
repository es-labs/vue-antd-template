import { createRouter, createWebHistory } from 'vue-router'
// import { useMainStore } from './store.js'
import { ROUTES, SECURE_ROUTES, PUBLIC_ROUTES } from './setups/routes.js'
import { authGuard } from './setups/authGuard'

const { BASE_URL } = import.meta.env
for (const route of SECURE_ROUTES) {
  route.beforeEnter = authGuard
  route.meta = { requiresAuth: true, layout: 'layout-secure' }
}

for (const route of PUBLIC_ROUTES) {
  route.beforeEnter = authGuard
  route.meta = { requiresAuth: false, layout: 'layout-public' }
}

const routerHistory = createWebHistory(BASE_URL)
const router = createRouter({
  history: routerHistory,
  routes: [
    ...PUBLIC_ROUTES, // authguard, requiresAuth: false, public-layout
    ...SECURE_ROUTES, // authguard, requiresAuth: true, secure-layout
    ...ROUTES // no authguard, no layout
  ]
})

// router.beforeEach((to) => { })
export default router
