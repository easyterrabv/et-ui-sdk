<template>
    <EtIcon icon="times" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/pro-regular-svg-icons";
library.add(faTimes);

import EtIcon from "./EtIcon.vue";
</script>
