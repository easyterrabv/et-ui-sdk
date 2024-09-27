<template>
    <EtIcon icon="globe-pointer" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGlobePointer } from "@fortawesome/pro-regular-svg-icons";
library.add(faGlobePointer);

import EtIcon from "./EtIcon.vue";
</script>
