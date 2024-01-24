<template>
    <EtIcon icon="arrow-turn-up" rotation="90" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowTurnUp } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowTurnUp);

import EtIcon from "./EtIcon.vue";
</script>
