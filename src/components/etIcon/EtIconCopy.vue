<template>
    <EtIcon icon="copy" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy } from "@fortawesome/pro-regular-svg-icons";
library.add(faCopy);

import EtIcon from "./EtIcon.vue";
</script>
