<template>
    <EtIcon icon="arrow-right-long" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightLong } from "@fortawesome/pro-regular-svg-icons";
library.add(faArrowRightLong);

import EtIcon from "./EtIcon.vue";
</script>
