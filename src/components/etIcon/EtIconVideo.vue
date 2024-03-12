<template>
    <EtIcon icon="video" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faVideo } from "@fortawesome/pro-regular-svg-icons";
library.add(faVideo);

import EtIcon from "./EtIcon.vue";
</script>
