# EasyTerra UI SDK

Standardized library of vue components and data model classes

## Developing

### Build Setup

```bash 
$ npm install  
```

Run the following command
```bash
$ npm run dev
```

### Releasing

Pushing to `master` triggers the `pre-push` git hook, which bumps the last version
field by one and rebuilds the `dist/` folder.

## Requirements

This package ships **uncompiled** Vue SFC and TypeScript source — your bundler
(Vite / Nuxt / webpack with `vue-loader`) compiles it.

- `vue` `^3.5` must be installed in the consuming app.
- Icons use **FontAwesome Pro**. Installing this package pulls Pro packages, so the
  consuming app needs FontAwesome Pro registry auth in its `.npmrc`:
  ```
  @fortawesome:registry=https://npm.fontawesome.com/
  //npm.fontawesome.com/:_authToken=YOUR_FONTAWESOME_PRO_TOKEN
  ```

## Usage
### Vue3
Install the package via NPM or yarn.

Import styling for components (pick what you need):
```javascript
import 'et-ui-sdk/styles.css';      // base component styles
import 'et-ui-sdk/variables.css';   // CSS custom properties / theme
import 'et-ui-sdk/normalize.css';   // optional reset
import 'et-ui-sdk/prose.css';       // optional rich-text (wysiwyg) styles
```

Use components via the package entry point:
```Vue
<script setup lang="ts">
import { EtButton } from 'et-ui-sdk';
</script>

<template>
  <div>
      ...
      <EtButton />
      ...
  </div>
</template>
```

Use models as such:
```javascript
import { EtModel } from 'et-ui-sdk';
const model = new EtModel();
```

> Deep imports such as `import EtButton from 'et-ui-sdk/src/components/etButton/EtButton.vue'`
> still resolve and remain supported.

### Nuxt2
Installing the package via NPM or yarn

Add this to nuxt.config.js
```javascript nuxt.config.js
{
    components: [
        '~/components',
        { path: 'node_modules/et-ui-sdk/src/components', level: 1 }
    ],
    buildModules: [
        '@nuxt/typescript-build'
    ]
}
```

then in components you can use:
```Vue
<template>
  <div>
      ...
      <EtButton />
      ...
  </div>
</template>
```

Use models as such:
```javascript
import { EtModel } from 'et-ui-sdk';
const model = new EtModel();
```