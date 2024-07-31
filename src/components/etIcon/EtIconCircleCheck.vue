<template>
    <EtIcon icon="circle-check" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck } from "@fortawesome/pro-regular-svg-icons";
library.add(faCircleCheck);

import EtIcon from "./EtIcon.vue";
</script>
