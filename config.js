import setup from './src/apps/apploader.js'
import { version } from './src/apps/package.json'

// console.log('/config - setup / env', setup, import.meta.env)
export const {
  BASE_URL, // from vite.config.js base property
  VERSION = version,

  // From setup.js
  LAYOUTS = setup.LAYOUTS,
  ROUTES = setup.ROUTES,
  PUBLIC_ROUTES = setup.PUBLIC_ROUTES,
  SECURE_ROUTES = setup.SECURE_ROUTES,
  INITIAL_SECURE_PATH = setup.INITIAL_SECURE_PATH,
  INITIAL_PUBLIC_PATH = setup.INITIAL_PUBLIC_PATH,
  onLogin = setup.onLogin,
  onLogout = setup.onLogout,
  authGuard = setup.authGuard
} = import.meta.env
