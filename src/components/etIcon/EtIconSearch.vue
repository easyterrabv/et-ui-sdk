<template>
    <EtIcon icon="magnifying-glass" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
library.add(faMagnifyingGlass);

import EtIcon from "./EtIcon.vue";
</script>
