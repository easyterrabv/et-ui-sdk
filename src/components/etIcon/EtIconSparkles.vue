<template>
    <EtIcon icon="sparkles" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSparkles } from "@fortawesome/pro-regular-svg-icons";
library.add(faSparkles);

import EtIcon from "./EtIcon.vue";
</script>
