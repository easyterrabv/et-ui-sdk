<template>
    <EtIcon icon="arrow-left" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowLeft);

import EtIcon from "./EtIcon.vue";
</script>
