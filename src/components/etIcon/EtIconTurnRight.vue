<template>
    <EtIcon icon="arrow-turn-up" rotation="90" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowTurnUp);

import EtIcon from "./EtIcon.vue";
</script>
