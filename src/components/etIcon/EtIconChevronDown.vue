<template>
    <EtIcon icon="chevron-down" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
library.add(faChevronDown);

import EtIcon from "src/components/etIcon/EtIcon.vue";
</script>
