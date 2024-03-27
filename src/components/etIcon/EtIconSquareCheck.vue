<template>
    <EtIcon icon="square-check" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
library.add(faSquareCheck);

import EtIcon from "./EtIcon.vue";
</script>
