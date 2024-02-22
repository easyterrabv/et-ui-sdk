<template>
    <EtIcon icon="arrows-from-dotted-line" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowsFromDottedLine } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowsFromDottedLine);

import EtIcon from "./EtIcon.vue";
</script>
