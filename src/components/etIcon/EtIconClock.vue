<template>
    <EtIcon icon="clock" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock } from "@fortawesome/pro-regular-svg-icons";
library.add(faClock);

import EtIcon from "./EtIcon.vue";
</script>
