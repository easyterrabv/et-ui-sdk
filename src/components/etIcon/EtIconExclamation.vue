<template>
    <EtIcon icon="exclamation" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
library.add(faExclamation);

import EtIcon from "./EtIcon.vue";
</script>
