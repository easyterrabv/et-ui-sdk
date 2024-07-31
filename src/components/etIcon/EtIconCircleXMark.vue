<template>
    <EtIcon icon="circle-xmark" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark } from "@fortawesome/pro-regular-svg-icons";
library.add(faCircleXmark);

import EtIcon from "./EtIcon.vue";
</script>
