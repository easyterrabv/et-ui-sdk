<template>
    <EtIcon icon="circle-exclamation" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleExclamation } from "@fortawesome/pro-regular-svg-icons";
library.add(faCircleExclamation);

import EtIcon from "./EtIcon.vue";
</script>
