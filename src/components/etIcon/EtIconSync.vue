<template>
    <EtIcon icon="sync" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSync } from "@fortawesome/pro-regular-svg-icons";
library.add(faSync);

import EtIcon from "./EtIcon.vue";
</script>
