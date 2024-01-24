<template>
    <EtIcon icon="chevron-down" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/pro-regular-svg-icons";
library.add(faChevronDown);

import EtIcon from "./EtIcon.vue";
</script>
