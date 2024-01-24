<template>
    <EtIcon icon="check" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/pro-regular-svg-icons";
library.add(faCheck);

import EtIcon from "./EtIcon.vue";
</script>
