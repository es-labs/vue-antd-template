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
- DO NOT develop custom code using `apps/app-sample`. Rename it or copy it to another folder name
- In apps/apploader.js, change `app-sample` to the folder you are using
- userland changes ONLY in the `apps` folder, NEVER outside the folder. Contact template maintainer if you need something outside `apps`
- do note any conflicts to resolve when merging from upstream

3 - Updating the template

```bash
# Commit and push to remote before running commands below
git fetch upstream # includes tags
git pull upstream <branch or tag> --no-rebase
# NO MORE IN USE git merge upstream/<branch or tag> --allow-unrelated-histories
# There may be some template related merge conflicts to resolve.
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
# Note your custom development folder is `<project root>/src/apps/web-sample`

npm run sample # run 1st sample web application
# OR
npm run local:mocked # run locally with mock service worker (many other API calls will fail because they are not mocked)
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

cd apps/web-sample
npm run test:e2e
```

## Project Structure And Features

See [apps/README.md]()

---

## Frontend Custom Application Notes

Setting up your custom frontend

**Notes:**
- `.env.[MODE]` indicates the environment file to use (command to use: npx vite build --mode $1)
  - e.g. npx vite build --config src/apps/vite.config.js --mode ${{ github.event.inputs.env }}
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
