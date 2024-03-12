<template>
    <EtIcon icon="chevron-up" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronUp } from "@fortawesome/pro-regular-svg-icons";
library.add(faChevronUp);

import EtIcon from "./EtIcon.vue";
</script>
