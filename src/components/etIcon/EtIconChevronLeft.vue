<template>
    <EtIcon icon="chevron-left" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
library.add(faChevronLeft);

import EtIcon from "./EtIcon.vue";
</script>
