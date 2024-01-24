<template>
    <EtIcon icon="plus" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
library.add(faPlus);

import EtIcon from "./EtIcon.vue";
</script>
