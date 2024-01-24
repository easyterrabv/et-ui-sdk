<template>
    <EtIcon icon="chevron-right" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronRight } from "@fortawesome/pro-regular-svg-icons";
library.add(faChevronRight);

import EtIcon from "./EtIcon.vue";
</script>
