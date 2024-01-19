<template>
    <EtIcon prefix="far" icon="envelope-open" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
library.add(faEnvelopeOpen);

import EtIcon from "./EtIcon.vue";
</script>
