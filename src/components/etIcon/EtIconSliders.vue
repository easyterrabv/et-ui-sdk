<template>
    <EtIcon icon="sliders" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSliders } from "@fortawesome/pro-regular-svg-icons";
library.add(faSliders);

import EtIcon from "./EtIcon.vue";
</script>
