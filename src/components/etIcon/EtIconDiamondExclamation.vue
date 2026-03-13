<template>
    <EtIcon icon="diamond-exclamation" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faDiamondExclamation } from "@fortawesome/pro-regular-svg-icons";
library.add(faDiamondExclamation);

import EtIcon from "./EtIcon.vue";
</script>
