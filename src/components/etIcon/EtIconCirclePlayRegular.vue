<template>
    <EtIcon prefix="far" icon="circle-play" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
library.add(faCirclePlay);

import EtIcon from "./EtIcon.vue";
</script>
