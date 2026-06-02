# EasyTerra UI SDK

Standardized library of Vue 3 components, composables and data-model classes.

## Requirements

This package ships **uncompiled** Vue SFC + TypeScript source — your bundler
(Vite / Nuxt / webpack with `vue-loader`) compiles it. There is no build step on
install and no published `dist`.

- `vue` `^3.5` must be installed in the consuming app (declared as a peer dependency).
- Icons use **FontAwesome Pro**. Installing this package pulls Pro packages, so the
  consuming app needs FontAwesome Pro registry auth in its `.npmrc`:
  ```
  @fortawesome:registry=https://npm.fontawesome.com/
  //npm.fontawesome.com/:_authToken=YOUR_FONTAWESOME_PRO_TOKEN
  ```

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

Import the stylesheets you need (paths are under `src/`):

```javascript
import 'et-ui-sdk/src/styles.css';      // base component styles (also @imports the three below)
import 'et-ui-sdk/src/variables.css';   // CSS custom properties / theme tokens
import 'et-ui-sdk/src/normalize.css';   // optional reset
import 'et-ui-sdk/src/prose.css';       // optional rich-text (wysiwyg) styles
```

> `styles.css` already `@import`s `variables.css`, `normalize.css` and `prose.css`,
> so importing it alone is usually enough.

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

> **Back-compat:** deep imports such as
> `import EtButton from 'et-ui-sdk/src/components/etButton/EtButton.vue'`
> still resolve. Prefer the bare `et-ui-sdk` entry for new code.

### Nuxt 2

```javascript
// nuxt.config.js
{
    components: [
        '~/components',
        { path: 'node_modules/et-ui-sdk/src/components', level: 1 }
    ],
    buildModules: ['@nuxt/typescript-build']
}
```

## Developing

```bash
npm install
npm run dev        # Vite dev server with the sandbox demo app
npm run type-check # vue-tsc
npm test           # Cypress component tests
```

## Releasing

Pushing to `master` triggers the `pre-push` git hook, which runs lint + tests,
bumps the version, commits, tags `vX.Y.Z`, and pushes. Consumers upgrade by
bumping the `#vX.Y.Z` tag in their `package.json` and reinstalling.
