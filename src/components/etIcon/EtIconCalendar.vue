<template>
    <EtIcon icon="calendar-days" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays } from "@fortawesome/pro-regular-svg-icons";
library.add(faCalendarDays);

import EtIcon from "./EtIcon.vue";
</script>
