<template>
    <EtIcon icon="file-contract" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileContract } from "@fortawesome/pro-regular-svg-icons";
library.add(faFileContract);

import EtIcon from "./EtIcon.vue";
</script>
