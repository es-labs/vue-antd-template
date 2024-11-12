import layoutPublic from '../../layouts/Public.vue' // you can change this to your own layout

export default {
  LAYOUTS: {
    layoutPublic,
  },
  ROUTES: [
  ],
  PUBLIC_ROUTES: [
    { path: '/', name: 'Home', component: () => import('./Hello.vue') },
    // { path: '/:catchAll(.*)', name: 'Home', component: () => import('./Hello.vue') },
  ],
  SECURE_ROUTES: [
  ],

  // route-setup
  INITIAL_PUBLIC_PATH: '/',

  // log-in/logout hook
  onLogin: () => console.log('login'),
  onLogout: () => console.log('logout')
}
