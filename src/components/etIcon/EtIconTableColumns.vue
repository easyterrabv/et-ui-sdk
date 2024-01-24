<template>
    <EtIcon icon="table-columns" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTableColumns } from "@fortawesome/pro-regular-svg-icons";
library.add(faTableColumns);

import EtIcon from "./EtIcon.vue";
</script>
