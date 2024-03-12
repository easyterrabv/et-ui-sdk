<template>
    <EtIcon icon="grip-vertical" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGripVertical } from "@fortawesome/pro-regular-svg-icons";
library.add(faGripVertical);

import EtIcon from "./EtIcon.vue";
</script>
