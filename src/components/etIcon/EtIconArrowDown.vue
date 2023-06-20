<template>
    <EtIcon icon="arrow-down" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
library.add(faArrowDown);

import EtIcon from "src/components/etIcon/EtIcon.vue";
</script>
