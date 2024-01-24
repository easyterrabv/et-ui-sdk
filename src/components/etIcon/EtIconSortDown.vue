<template>
    <EtIcon icon="sort-down" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortDown } from "@fortawesome/pro-regular-svg-icons";
library.add(faSortDown);

import EtIcon from "./EtIcon.vue";
</script>
