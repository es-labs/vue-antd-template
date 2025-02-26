## Read Me FIRST!

> Do NOT edit this README. Go to [apps/README.md]() to view and edit user README
>
> Built from [https://github.com/es-labs/vue-antd-template]()
>
> For template design principles, see [https://github.com/ais-one/cookbook#important---read-me-first]() 

## Template Maintenance

1 - setup to allow incoming merge from upstream template update

```bash
# run once only after you `clone`, or `fork` or `delete .git and run git init`
./setup-upstream.sh
```

2 - Setup for your custom code

**Important notes** - **TO UPDATE!**
- DO NOT develop custom code using `apps/web-sample` or `apps/web-sample2`. Rename it or copy it to another folder name
- Update only your own application folders, `apps/package.json` or `apps/.gitignore` for userland changes, NEVER other filer or folders. Contact template maintainer if you need something outside those.
- do note any conflicts to resolve when merging from upstream

3 - Updating the template

```bash
# Commit and push to remote before running commands below
git fetch upstream # includes tags
git pull upstream <branch or tag> --no-rebase
# add option "--allow-unrelated-histories" if there conflicts to resolve.
```

**Suggested Conventions**
- branch
  - main = stable
  - work = working branch
  - feat-<issue number>
  - bugfix-<issue number>
- release tags
  - use semver, e.g. 1.2.3
  - should tag main branch
- environments
  - development = local machine development
  - dev = development server
  - prd = production server
---

## Install & Run & E2E Test

```bash
npm i
cd apps
npm i

npm run sample # run 1st sample web application in <project root>/apps/web-sample
# Visit `http://127.0.0.1:8080` to view application

npm run sample2 # run 2nd sample web application in <project root>/apps/web-sample2
# Visit `http://127.0.0.1:8081` to view application

# Note your custom development folder is `<project root>/apps/<your-custom-web-app>`
```

**Note For Login**

Login using one of the following:  
- Faked Login: [NOTE: API calls to protected Endpoints WILL FAIL!]:
  - Login: fake a user and login, no backend needed, just click button
  - Login Callback: fake a callback and set fake user and login, no backend needed, just click button
- Login: normal login with OTP, express server needs to be run
  - details already **prefilled** with following values, just click on Login button
  - User and password is `test`
  - OTP (if enabled - e.g. USE_OTP=TEST): use 111111 as otp pin, already prefilled, click on OTP button
- Enterprise SSO (SAML2, OIDC) refer to [https://github.com/es-labs/express-template#saml-oidc-oauth]() for info

[TODO] E2E Tests:

```bash
npx playwright install chromium
npx playwright test --browser=chromium

cd apps
npm run test:e2e
```

[TODO] Run with MockServiceWorker

```bash
# TBD
npm run local:mocked # run locally with mock service worker (many other API calls will fail because they are not mocked)
```

---

## Project Structure And Features

See [apps/README.md]()

## Frontend Custom Application Notes

Setting up your custom frontend

**Notes:**
- `apps/web-sample` is a sample skeleton that can be used as scaffolding
  - `envs` folder
    - `.env` is common to all environments for the app
    - `.env.[MODE]` indicates the environment file to use (command to use: npx vite build --mode $1)
  - `ROUTES` property
    - use kebab-case, will be converted to Capital Case in menu display
    - only up to 1 submenu level
      - /first-level
      - /submenu/second-level
    - paths
      - '~/xxx.js' from **<project>/src** folder
      - '/xxx.js' from **<project>** folder
- **IMPORTANT NOTE** When you create a new application
  - create it in the `apps` folder
  - add folder entry to `apps/.gitignore` so that the folder can be included in git
  - add new entry in the package.json folder to run the application
    - e.g. npx vite build --config apps/<your-app-name>/vite.config.js --mode <environment>
  - update vite.config.js `root` property folder name to be <your-app-name>

### Sample Deployment - WIP

1. configure .env.prd
2. run the following workflow `.github\workflows\sample-manual-gh-pages.yml`, select env as prd

- https://ideas.digitalocean.com/storage/p/deploy-static-sites-to-spacescdn
- https://docs.digitalocean.com/products/spaces/reference/s3-compatibility
- https://es-labs.sgp1-static.digitaloceanspaces.com

PUT ?website HTTP/1.1
Host: example.com.s3.<Region>.amazonaws.com
Content-Length: 256
Date: Thu, 27 Jan 2011 12:00:00 GMT
Authorization: signatureValue

<WebsiteConfiguration xmlns='http://s3.amazonaws.com/doc/2006-03-01/'>
    <IndexDocument>
        <Suffix>index.html</Suffix>
    </IndexDocument>
    <ErrorDocument>
        <Key>index.html</Key>
    </ErrorDocument>
</WebsiteConfiguration>

## Notes & Todos

- Move the following files to userland folder if possible
  - package.json (may not be necessary)
- [Why Use Vite](https://indepth.dev/a-note-on-vite-a-very-fast-dev-build-tool/)
