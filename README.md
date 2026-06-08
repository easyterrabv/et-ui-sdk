# EasyTerra UI SDK

Standardized library of Vue 3 components, composables and data-model classes.

## Requirements

This package ships as a **compiled** library. It is distributed via Git tag, and
the compiled output (`dist/` — ESM + `.d.ts` types) is built automatically on
install by the `prepare` script. Consumers import the **precompiled** entry and
do **not** compile the SFCs themselves.

- `vue` `^3.5` must be installed in the consuming app (declared as a peer dependency).
- Because `dist/` is built on install, the consuming app's toolchain runs the
  build once per version: this needs the FontAwesome Pro auth below to be present
  **before** `npm install`.
- Icons use **FontAwesome Pro**. This package is intended for FontAwesome Pro
  licensees: installing it pulls `@fortawesome/pro-*` packages transitively, so
  you **must** have FontAwesome Pro registry auth configured **before** running
  `npm install`.

  Put this in your **user-level `~/.npmrc`** (home directory) — see
  [`.npmrc.example`](./.npmrc.example). A project-level `.npmrc` is **not**
  reliably picked up for the transitive Pro fetch (confirmed from experience);
  use `~/.npmrc`:
  ```
  @fortawesome:registry=https://npm.fontawesome.com/
  //npm.fontawesome.com/:_authToken=YOUR_FONTAWESOME_PRO_TOKEN
  ```
  - macOS/Linux: `~/.npmrc`
  - Windows: `%USERPROFILE%\.npmrc`

  Get a token at https://fontawesome.com/account (Pro license > tokens).

### Troubleshooting: 401 on install

If `npm install` fails with something like:

```
npm error code E401
npm error 401 Unauthorized - GET https://npm.fontawesome.com/@fortawesome/pro-regular-svg-icons
```

your FontAwesome Pro auth is missing or wrong. This is expected without a Pro
license — the Pro icon packages cannot be fetched. Fix:

1. Confirm `~/.npmrc` (home dir) has the two lines above — not a project-local `.npmrc`.
2. Confirm the token is valid (not expired/revoked) at https://fontawesome.com/account.
3. In CI, supply the token as a secret and write `~/.npmrc` before `npm install`:
   ```bash
   echo "@fortawesome:registry=https://npm.fontawesome.com/" >> ~/.npmrc
   echo "//npm.fontawesome.com/:_authToken=${FA_TOKEN}" >> ~/.npmrc
   ```

> No `preinstall` guard can pre-empt this error — npm fails during dependency
> resolution, before any package script runs. The fix is always the `.npmrc` auth.

## Installation

Distributed via Git tag (not the npm registry). Pin to a tag:

```bash
npm install github:easyterrabv/et-ui-sdk#v0.1.2
```

```jsonc
// package.json
"dependencies": {
  "et-ui-sdk": "github:easyterrabv/et-ui-sdk#v0.1.2"
}
```

## Usage

### Styling

The compiled build bundles all component CSS into a single stylesheet. Import it
once:

```javascript
import 'et-ui-sdk/dist/style.css';   // all component styles (bundled), incl. variables/normalize/prose
```

### Components, helpers and models

Import everything by name from the package entry point. Imports are
**tree-shakeable** — only what you use is bundled (e.g. importing a helper pulls
no components; importing `EtWysiwyg` is the only thing that pulls TipTap):

```vue
<script setup lang="ts">
import { EtButton, EtInput, wait, EtModel } from 'et-ui-sdk';

const model = new EtModel();
await wait(200);
</script>

<template>
  <EtButton>Save</EtButton>
</template>
```

The entry point re-exports public components, layouts, helpers, models, DataGrid
interfaces/composables and provider interface types. Component **internals**
(paths containing `/internals/`) are intentionally not exported.

> The package ships **only the compiled `dist/`** — raw `src/` is no longer
> published. Import everything from the bare `et-ui-sdk` entry. Old `et-ui-sdk/src/*`
> deep imports (components, helpers, `src/styles.css`) no longer resolve; migrate
> them to the bare entry and `et-ui-sdk/dist/style.css`.

## Developing

```bash
npm install         # also builds dist/ via the prepare script
npm run dev         # Vite dev server with the sandbox demo app
npm run build       # compile the library -> dist/ (ESM + .d.ts)
npm run build:demo  # build the sandbox demo as a static site -> demo-dist/
npm run preview:demo
npm run type-check  # vue-tsc
npm test            # Cypress component tests
```

## Releasing

Pushing to `master` triggers the `pre-push` git hook, which runs lint + tests,
bumps the version, commits, tags `vX.Y.Z`, and pushes. Consumers upgrade by
bumping the `#vX.Y.Z` tag in their `package.json` and reinstalling.
