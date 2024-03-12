<template>
    <EtIcon icon="cogs" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCogs } from "@fortawesome/pro-regular-svg-icons";
library.add(faCogs);

import EtIcon from "./EtIcon.vue";
</script>
