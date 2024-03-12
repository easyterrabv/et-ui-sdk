<template>
    <EtIcon icon="question" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuestion } from "@fortawesome/pro-regular-svg-icons";
library.add(faQuestion);

import EtIcon from "./EtIcon.vue";
</script>
