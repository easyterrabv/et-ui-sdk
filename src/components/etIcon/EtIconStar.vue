<template>
    <EtIcon icon="star" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/pro-regular-svg-icons";
library.add(faStar);

import EtIcon from "./EtIcon.vue";
</script>
