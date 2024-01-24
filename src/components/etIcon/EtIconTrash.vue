<template>
    <EtIcon icon="trash" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/pro-regular-svg-icons";
library.add(faTrash);

import EtIcon from "./EtIcon.vue";
</script>
