<template>
    <EtIcon icon="arrow-down" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowDown);

import EtIcon from "./EtIcon.vue";
</script>
