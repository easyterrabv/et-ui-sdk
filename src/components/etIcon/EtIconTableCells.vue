<template>
    <EtIcon icon="table-cells-large" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTableCellsLarge } from "@fortawesome/pro-regular-svg-icons";
library.add(faTableCellsLarge);

import EtIcon from "./EtIcon.vue";
</script>
