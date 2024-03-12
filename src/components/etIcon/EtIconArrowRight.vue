<template>
    <EtIcon icon="arrow-right" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowRight);

import EtIcon from "./EtIcon.vue";
</script>
