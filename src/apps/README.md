> Add your readme content here, edit or remove the ones below

---

## Project Structure

```
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
|  |  +- common/ : codes here user may not need to touch much
|  |     +- msw.js : for mock service worker [NEED TO SPECIFY PATH TO MOCKS]
|  |     +- pwa.js : for PWA (work in progress)
|  |     +- sentry.js : for error reporting
|  |  +- web-<Your-Custom-Frontend>/: folder with prefix "-web" are your custom frontend code (your frontend repo)
|  |  +- web-sample/
|  |     +- components/
|  |     +- layouts/
|  |     +- mocks/ : for msw
|  |     +- setups/ : used by setup.js
|  |     +  +- authGuard.js : authGuard setup and initial paths
|  |     +  +- ws.js : websocket open / close
|  |     +- style/
|  |     +  +- main.css # overall custom styling (import in setup.js)
|  |     +  +- signin.css # custom styling for SignIn.vue
|  |     +- tests/
|  |     +  +- example.spec.js
|  |     +- views/
|  |     +- .gitignore: for your repo
|  |     +- playwright.config.js
|  |     +  setup.js : custom frontend setup export (important!)
|  |     +- store.js : custom frontend store
|  |  +- .env.sample
|  |  +- .gitignore
|  |  +- apploader.js.sample : to create apploader.js from this sample
|  |  +- init.js : pre and post createApp calls
|  |  +- package.json
|  |  +- README.md
|  |  +- vite.config.js
|  +- layouts/
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
```
