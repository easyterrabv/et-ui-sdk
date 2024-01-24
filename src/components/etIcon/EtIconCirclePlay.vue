<template>
    <EtIcon icon="circle-play" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlay } from "@fortawesome/pro-regular-svg-icons";
library.add(faCirclePlay);

import EtIcon from "./EtIcon.vue";
</script>
