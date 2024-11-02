<template>
    <EtIcon icon="envelopes-bulk" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopesBulk } from "@fortawesome/pro-regular-svg-icons";
library.add(faEnvelopesBulk);

import EtIcon from "./EtIcon.vue";
</script>
