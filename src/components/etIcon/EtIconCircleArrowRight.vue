<template>
    <EtIcon icon="circle-arrow-right" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleArrowRight } from "@fortawesome/pro-regular-svg-icons";
library.add(faCircleArrowRight);

import EtIcon from "./EtIcon.vue";
</script>
