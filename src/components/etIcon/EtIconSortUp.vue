<template>
    <EtIcon icon="sort-up" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortUp } from "@fortawesome/pro-regular-svg-icons";
library.add(faSortUp);

import EtIcon from "./EtIcon.vue";
</script>
