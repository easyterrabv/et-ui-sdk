<template>
    <EtIcon icon="chevron-left" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronLeft);

import EtIcon from "src/components/etIcon/EtIcon.vue";
</script>
