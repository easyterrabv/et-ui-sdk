<template>
    <EtIcon icon="scale-balanced" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faScaleBalanced } from "@fortawesome/pro-regular-svg-icons";
library.add(faScaleBalanced);

import EtIcon from "./EtIcon.vue";
</script>
