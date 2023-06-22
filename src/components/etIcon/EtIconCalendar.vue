<template>
    <EtIcon icon="calendar-days" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
library.add(faCalendarDays);

import EtIcon from "./EtIcon.vue";
</script>
