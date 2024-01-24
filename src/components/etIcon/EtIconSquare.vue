<template>
    <EtIcon icon="square" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSquare } from "@fortawesome/pro-regular-svg-icons";
library.add(faSquare);

import EtIcon from "./EtIcon.vue";
</script>
