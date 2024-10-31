<template>
    <EtIcon icon="square-info" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSquareInfo } from "@fortawesome/pro-regular-svg-icons";
library.add(faSquareInfo);

import EtIcon from "./EtIcon.vue";
</script>
