> Add your readme content here, edit or remove the ones below

---

## Project Structure

TBD - To Redo

```
+- apps/
|  +- common/ : codes here user may not need to touch much, commonly used in project
|  |  +- plugins/ : i18n, fetch, ws (websocket), useMediaQuery
|  |  +- views/ : NotFound, NotAllowed, EmptyView
|  |  +- msw.js : for mock service worker [NEED TO SPECIFY PATH TO MOCKS]
|  |  +- pwa.js : for PWA (work in progress)
|  |  +- sentry.js : for error reporting
|  +- web-sample/
|  |  +- components/
|  |  +- envs/ : dotenv files here
|  |  +- layouts/ : your layouts here
|  |  +- mocks/ : for msw
|  |  +- public/ : web public html folder
|  |  +- setups/ : see README.md in here
|  |  +- style/ : see README.md in here
|  |  +- tests/ : example.spec.js
|  |  +- views/ : your pages here
|  |  +- App.vue
|  |  +- index.html
|  |  +- main.js
|  |  +- playwright.config.js
|  |  +- router.js
|  |  +- store.js : or store/index.js
|  |  +- vite.config.js
|  +- web-sample2/ : a second sample web app
|  +- web-<Your-Custom-Frontend>/: folder with prefix "-web" are your custom frontend code (your frontend repo)
|  +- .gitignore
|  +- package.json
|  +- README.md
+- .gitguardian.yml
+- .gitignore
+- .prettierrc.js
+- CHANGELOG.md
+- eslint.config.js
+- package.json
+- README.md
+- setup-upstream.sh
```
