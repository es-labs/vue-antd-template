import './style/main.css' // app overall custom style
import { authGuard, INITIAL_PUBLIC_PATH, INITIAL_SECURE_PATH } from './setups/authGuard'
import { openWs, closeWs } from './setups/ws'
import layoutPublic from '../../layouts/Public.vue' // you can change this to your own layout
import layoutSecure from '../../layouts/Secure.vue' // as above

// :key="$route.fullPath" // this is causing problems

export default {
  LAYOUTS: {
    layoutPublic,
    layoutSecure
  },
  ROUTES: [
    // you can change this to your custom views for Not Found and Not Allowed (Forbidden) view
    // { path: '/:catchAll(.*)', name: 'catchAll', redirect: { name: 'SignIn' }, meta: { requiresAuth: false, layout: 'layout-public' } },
    { path: '/forbidden', name: 'NotAllowed', component: () => import('../../views/NotAllowed.vue') },
    { path: '/:catchAll(.*)', name: 'NotFound', component: () => import('../../views/NotFound.vue') }
  ],
  PUBLIC_ROUTES: [
    { path: '/', name: 'Home', component: () => import('./views/SignIn.vue') },
    { path: '/signin', name: 'SignIn', component: () => import('./views/SignIn.vue') },
    { path: '/callback', name: 'Callback', component: () => import('./views/Callback.vue') }
  ],
  SECURE_ROUTES: [
    { path: '/dashboard', name: 'Dashboard', component: async () => import('./views/Dashboard.vue') },

    { path: '/demo/test', name: 'Tests', component: async () => import('./views/Demo/DemoTest.vue') },
    { path: '/demo/web-cam', name: 'Web Cam', component: () => import('./views/Demo/DemoWebCam.vue') },
    { path: '/demo/sign-pad', name: 'Sign Pad', component: async () => import('./views/Demo/DemoSignPad.vue') },
    { path: '/demo/table-edit', name: 'Table Edit', component: async () => import('./views/Demo/DemoTableEdit.vue') },
    { path: '/demo/table', name: 'Table', component: async () => import('./views/Demo/DemoTable.vue') },
    { path: '/demo/table-crud', name: 'Table CRUD', component: async () => import('./views/Demo/DemoTableCrud.vue') },

    { path: '/visuals/g2-chart1', name: 'G2 Chart1', component: async () => import('./views/Visuals/DemoChart1.vue') },
    { path: '/visuals/leaflet-map', name: 'Leaflet', component: () => import('./views/Visuals/DemoLeaflet.vue') },

    { path: '/data-entry/form', name: 'Form', component: async () => import('./views/DataEntry/DemoForm.vue') },
    { path: '/data-entry/card', name: 'Card', component: async () => import('./views/DataEntry/DemoCard.vue') },
    { path: '/data-entry/cascade', name: 'Cascade', component: async () => import('./views/DataEntry/DemoCascade.vue') },
    { path: '/data-entry/cascade2', name: 'Cascade2', component: async () => import('./views/DataEntry/DemoCascade2.vue') },
    { path: '/favv/cascade2-api', name: 'Casecase2 (API) FAVV', component: async () => import('./views/Favv/DemoCascade2Api.vue') },

    { path: '/demo-view/fill', name: 'Fill No Param', component: async () => import('./views/Demo/Filler.vue') },
    { path: '/demo-view/fill/:param', name: 'Fill Param', component: async () => import('./views/Demo/Filler.vue'), hidden: true },
    { path: '/test', name: 'Fill No ID', component: async () => import('./views/Demo/Filler.vue') },
    ...Array.from(Array(15), (x, i) => {
      return { path: '/test/' + i, name: 'Fill ID ' + i, component: async () => import('./views/Demo/Filler.vue'), props: { testId: i } }
    })
  ],

  // route-setup
  INITIAL_PUBLIC_PATH,
  INITIAL_SECURE_PATH,
  authGuard,

  // log-in/logout hook
  onLogin: () => openWs(),
  onLogout: () => closeWs()
}
