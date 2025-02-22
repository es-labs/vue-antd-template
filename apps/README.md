> Add your readme content here, edit or remove the ones below

---

## Project Structure

TBD - To Redo

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
+- apps/
|  +- common/ : codes here user may not need to touch much, commonly used in project
|  +- plugins/ : i18n, fetch, ws (websocket), useMediaQuery
|  +- views/ : 
|  |  +- msw.js : for mock service worker [NEED TO SPECIFY PATH TO MOCKS]
|  |  +- pwa.js : for PWA (work in progress)
|  |  +- sentry.js : for error reporting
|  +- web-<Your-Custom-Frontend>/: folder with prefix "-web" are your custom frontend code (your frontend repo)
|  +- web-sample/
|     +- components/
|     +- layouts/
|     +- mocks/ : for msw
|     +- setups/ : used by setup.js
|     +  +- authGuard.js : authGuard setup and initial paths
|     +  +- ws.js : websocket open / close
|     +- style/
|     +  +- main.css # overall custom styling (import in setup.js)
|     +  +- signin.css # custom styling for SignIn.vue
|     +- tests/
|     +  +- example.spec.js
|     +- views/
|     +- .gitignore: for your repo
|     +- playwright.config.js
|     +  setup.js : custom frontend setup export (important!)
|     +- store.js : custom frontend store
      +- config.js
      +- index.html
|  |  +- .env.sample
|  |  +- .gitignore
|  |  +- init.js : pre and post createApp calls
|  |  +- package.json
|  |  +- README.md
|  |  +- vite.config.js
|  +- layouts/
|  +- App.vue
|  +- main.js
|  +- pwa-init.js
|  +- router.js
|  +- services.js
|  +- store.js
+- .eslintignore
+- .eslintrc.js
+- .gitguardian.yml
+- .gitignore
+- .prettierrc.js
+- package.json
+- README.md
```
