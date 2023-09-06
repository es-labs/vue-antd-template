import setup from './src/apps/apploader.js'
import { version } from './src/apps/package.json'

// console.log('/config - setup', setup)
// console.log('/config - env', import.meta.env)
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
  ON_LOGIN = setup.ON_LOGIN,
  ON_LOGOUT = setup.ON_LOGOUT
} = import.meta.env
