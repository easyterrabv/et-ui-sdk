<template>
    <EtIcon icon="square-minus" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSquareMinus } from "@fortawesome/pro-regular-svg-icons";
library.add(faSquareMinus);

import EtIcon from "./EtIcon.vue";
</script>
