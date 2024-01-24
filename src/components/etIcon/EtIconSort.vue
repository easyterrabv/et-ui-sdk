<template>
    <EtIcon icon="sort" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSort } from "@fortawesome/pro-regular-svg-icons";
library.add(faSort);

import EtIcon from "./EtIcon.vue";
</script>
