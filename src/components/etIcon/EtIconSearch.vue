<template>
    <EtIcon icon="magnifying-glass" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

import EtIcon from "./EtIcon.vue";
</script>
