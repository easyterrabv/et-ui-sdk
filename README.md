# EasyTerra UI SDK

Standardized library of vue components and data model classes

## Developing

### Build Setup

```bash 
$ npm install  
```

### Releasing

Committing to `master` will automatically bump version by one minor version and rebuild the `dist/` folder.


## Usage
### Vue3
Installing the package via NPM or yarn

Use components as such:

Import styling for components
```javascript
import 'et-ui-sdk/dist/style.css';
```

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
import { Model } from 'et-ui-sdk';
const model = new Model();
```

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
import { Model } from 'et-ui-sdk';
const model = new Model();
```