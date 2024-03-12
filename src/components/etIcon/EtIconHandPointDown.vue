<template>
    <EtIcon icon="hand-point-down" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHandPointDown } from "@fortawesome/pro-regular-svg-icons";
library.add(faHandPointDown);

import EtIcon from "./EtIcon.vue";
</script>
