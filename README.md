# Description

Built from a [Vue SPA + Ant Design Template](https://github.com/es-labs/vue-antd-template)

## Read Me FIRST!

[https://github.com/ais-one/cookbook#important---read-me-first]()

## Setup

1. setup to allow incoming merge from upstream template update

```bash
# run once only after you `clone`, or `fork` or `delete .git and run git init`
./setup-upstream.sh
```

2. Setup for your custom code

```bash
# setup your env file
cp src/apps/.env.sample src/apps/.env.development
```

**Important notes**
- You can develop custom code in `apps/app-sample` or rename it or copy it to another folder name
- In apps/apploader.js, change `app-sample` to the folder you are using
- userland changes only in the `apps` folder
- do note any conflicts to resolve when merging from upstream

3. Updating the template

```bash
# Commit and push to remote before running commands below
git fetch upstream
git merge upstream/main # or 'git merge upstream/main --allow-unrelated-histories'
# There may be some template related merge conflicts to resolve.
```

---

## Install & Run & E2E Test

```bash
npm i
cd src/apps/<your custom development folder> default is `web-sample`
npm i
cd ../../..
npm run dev # using the dev server
```

Visit `http://127.0.0.1:8080` to view application

**Note For Login**

Login using one of the following:  
- Mocked [NOTE: API calls to protected Endpoints WILL FAIL!]:
  - Login: fake a user and login, no backend needed, just click button
  - Login Callback: fake a callback and set fake user and login, no backend needed, just click button
- Login: normal login with OTP, express server needs to be run
  - details already **prefilled** with following values, just click on Login button
  - User and password is `test`
  - OTP (if enabled - e.g. USE_OTP=TEST): use 111111 as otp pin, already prefilled, click on OTP button
- Enterprise SSO (SAML2, OIDC) refer to [https://github.com/es-labs/express-template#saml-oidc-oauth]() for info

E2E Tests:

```bash
npx playwright install chromium
npx playwright test --browser=chromium

cd src/apps/web-sample
npm run test:e2e
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
|  |  +- web-sample/
|  |     +- components/
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
- `.env.[MODE]` indicates the environment file to use (command to use: npx vite build --mode $1)
- `src/apps/apploader.js` will specify the path to `setup.js` of in your custom code folder
- see **src/apps/web-sample/setup.js** on the frontend setup especially the ROUTES property
- ROUTES property
  - use kebab-case, will be converted to Capital Case in menu display
  - only up to 1 submenu level
    - /first-level
    - /submenu/second-level
  - paths
    - '~/xxx.js' from **<project>/src** folder
    - '/xxx.js' from **<project>** folder


### Sample Deployment - WIP NOT READY YET

1. configure .env.production
2. run the following workflow `.github\workflows\sample-manual-gh-pages.yml`, select env as production


## Notes & Todos

- [Why Use Vite](https://indepth.dev/a-note-on-vite-a-very-fast-dev-build-tool/)
- Mocks are not ready yet
- Tests are not ready yet

