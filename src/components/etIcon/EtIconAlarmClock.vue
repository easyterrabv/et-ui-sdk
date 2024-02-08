<template>
    <EtIcon icon="alarm-clock" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAlarmClock } from "@fortawesome/pro-regular-svg-icons";
library.add(faAlarmClock);

import EtIcon from "./EtIcon.vue";
</script>
