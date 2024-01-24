<template>
    <EtIcon icon="stopwatch" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStopwatch } from "@fortawesome/pro-regular-svg-icons";
library.add(faStopwatch);

import EtIcon from "./EtIcon.vue";
</script>
