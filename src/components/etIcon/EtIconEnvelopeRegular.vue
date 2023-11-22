<template>
    <EtIcon icon="envelope" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
library.add(faEnvelope);

import EtIcon from "./EtIcon.vue";
</script>
