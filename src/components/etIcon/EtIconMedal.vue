<template>
    <EtIcon icon="medal" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMedal } from "@fortawesome/pro-regular-svg-icons";
library.add(faMedal);

import EtIcon from "./EtIcon.vue";
</script>
