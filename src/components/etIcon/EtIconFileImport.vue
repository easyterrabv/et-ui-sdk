<template>
    <EtIcon icon="file-import" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileImport } from "@fortawesome/pro-regular-svg-icons";
library.add(faFileImport);

import EtIcon from "./EtIcon.vue";
</script>
