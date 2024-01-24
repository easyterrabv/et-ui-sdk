<template>
    <EtIcon icon="arrow-rotate-right" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRotateRight } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowRotateRight);

import EtIcon from "./EtIcon.vue";
</script>
