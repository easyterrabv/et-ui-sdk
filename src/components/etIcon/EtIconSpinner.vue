<template>
    <EtIcon icon="spinner" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/pro-regular-svg-icons";
library.add(faSpinner);

import EtIcon from "./EtIcon.vue";
</script>
