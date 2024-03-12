<template>
    <EtIcon icon="file" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFile } from "@fortawesome/pro-regular-svg-icons";
library.add(faFile);

import EtIcon from "./EtIcon.vue";
</script>
