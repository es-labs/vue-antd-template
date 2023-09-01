# Vue-Vite

A Template Vue SPA using Ant Design Vue UI and built with Vite

## Read Me FIRST!

TBD

instructions on working with templates

## Setup

1. Copy application specific files to project root

Assumming the application name is called `web-template`

```bash
cp src/apps/app-deploy/deploy/.env.* .
cp src/apps/app-deploy/deploy/.apploader.js .
```

2. Run the following

```bash
npm install
cd src/apps/web-template
npm install
cd ../../..
npm run dev
```

3. Visit

- http://127.0.0.1:8080/ to view application

4. E2E Testing

Install and run the bakcend application and associated datastore (sqlite) in [https://github.com/es-labs/express-template]()

```bash
npx playwright install chromium
npx playwright test --browser=chromium

cd src/apps/web-template
npm run test:e2e
```


## Development Mode (using dev server)

**Note For Login**

Login using one of the following:
  
- Mocked [NOTE: API calls to protected Endpoints WILL FAIL!]:
  - Login: fake a user and login, no backend needed, just click button
  - Login Callback: fake a callback and set fake user and login, no backend needed, just click button
- Login: normal login with OTP, express server needs to be run
  - details already **prefilled** with following values, just click on Login button
  - User: test
  - Password: test
  - OTP (if enabled - e.g. USE_OTP=TEST): use 111111 as otp pin, already prefilled, click on OTP button
- Enterprise SSO (SAML2, OIDC) refer to [https://github.com/ais-one/cookbook]() on sample implementation


## 

TBD (doing already in a wiki) create steps of fork/cloning template repo and derived repo

## Clean up

```
npm cache clean --force
rm -rf node_modules
rm package-lock.json
```

## Project Strcuture

```
+- nested/ : testing for multi-html
+- public/
|  +- img/
|  |  +- icons/
|  |  +- splash/
|  +- static/
|  +- favicon.ico
|  +- manifest.json
|  +- robots.txt
|  +- service-worker.js
|  +- sitemap.xml
|  +- style.css
+- src/
|  +- apps/
|  |  +- web-<Your-Custom-Frontend>/: folder with prefix "-web" are your custom frontend code (your frontend repo)
|  |  +- web-template/
|  |     +- components/
|  |     +- deploy/ : contains custom deployment info & files see js-node/expressjs/deploy/README.md
|  |     +- layouts/
|  |     +- tests/
|  |     +  +- example.spec.js
|  |     +- views/
|  |     +- .gitignore: for your repo
|  |     +- hookFns.js
|  |     +- package.json
|  |     +- playwright.config.js
|  |     +- setup.js: custom frontend setup (set INITIAL_SECURE_PATH, ROUTES CONSTANTS here)
|  |     +- store.js: custom frontend store
|  |  +- apploader.js.sample : to create apploader.js from this sample
|  +- layouts/
|  +- mocks/ : for msw later
|  +- plugins/ : i18n, fetch, ws (websocket), useMediaQuery
|  +- views/
|  +- App.vue
|  +- main.js
|  +- pwa-init.js
|  +- router.js
|  +- services.js
|  +- store.js
+- .env.development.sample : to create other envs
+- .eslintignore
+- .eslintrc.js
+- .gitguardian.yml
+- .gitignore
+- .prettierrc.js
+- config.js
+- index.html
+- package.json
+- README.md
+- vite.config.js
```

---
## Frontend Custom Application Notes

Setting up your custom frontend

**Notes:**
- in **package.json**, default environment for `vite` command is `development`
- `.env.<environment>` and `apploader.js` files are specific to each application and found in `src/web<your-web-app>/deploy` folder, **they are copied to root folder** when switching app to work on
- **apploader.js** contains the app setup file to use
- `.env.[MODE]` indicates the environment file to use (command to use: npx vite build --mode $1)
- All folders and files prefixed with TBD can be ignored, they are not implemented and used for reference

```bash
# in src/apps
# note that project name must start with prefix "web-"
git clone <your frontend project e.g. web-example>
```
- see **.env.development** for defining vite.config.js and environment level (eg API URL) related configurations
- see **apploader.js** for loading custom frontend
- environment is selected using the --mode property (see package.json)
- use **src/apps/web-template/** as reference on your custom frontend
- see **src/apps/web-template/setup.js** on the frontend setup especially the ROUTES property
- ROUTES property
  - use kebab-case, will be converted to Capital Case in menu display
  - only up to 1 submenu level
    - /first-level
    - /submenu/second-level
  - paths
    - '~/xxx.js' from **<project>/src** folder
    - '/xxx.js' from **<project>** folder


### Sample Deployment - WIP to test

1. configure .env.production
2. run the following workflow `.github\workflows\sample-manual-gh-pages.yml`, select env as production


## Notes & Todos

- [Why Use Vite](https://indepth.dev/a-note-on-vite-a-very-fast-dev-build-tool/)
- Mocks are not ready yet
- Tests are not ready yet

