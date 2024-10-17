<template>
    <EtIcon icon="merge" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMerge } from "@fortawesome/pro-regular-svg-icons";
library.add(faMerge);

import EtIcon from "./EtIcon.vue";
</script>
