<template>
    <EtIcon icon="arrows-up-down" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowsUpDown } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowsUpDown);

import EtIcon from "./EtIcon.vue";
</script>
