<template>
    <EtIcon icon="map-marked-alt" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkedAlt } from "@fortawesome/pro-regular-svg-icons";
library.add(faMapMarkedAlt);

import EtIcon from "./EtIcon.vue";
</script>
