<template>
    <EtIcon icon="arrow-turn-down-right" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowTurnDownRight } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowTurnDownRight);

import EtIcon from "./EtIcon.vue";
</script>
