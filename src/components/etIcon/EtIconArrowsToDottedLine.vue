<template>
    <EtIcon icon="arrows-to-dotted-line" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowsToDottedLine } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowsToDottedLine);

import EtIcon from "./EtIcon.vue";
</script>
