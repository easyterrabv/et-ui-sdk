<template>
    <EtIcon icon="arrow-up" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowUp } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowUp);

import EtIcon from "./EtIcon.vue";
</script>
