<template>
    <EtIcon icon="spell-check" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpellCheck } from "@fortawesome/pro-regular-svg-icons";
library.add(faSpellCheck);

import EtIcon from "./EtIcon.vue";
</script>
