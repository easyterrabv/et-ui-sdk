<template>
    <EtIcon icon="car" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCar } from "@fortawesome/pro-regular-svg-icons";
library.add(faCar);

import EtIcon from "./EtIcon.vue";
</script>
