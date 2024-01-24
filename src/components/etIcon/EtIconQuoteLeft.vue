<template>
    <EtIcon icon="quote-left" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faQuoteLeft } from "@fortawesome/pro-regular-svg-icons";
library.add(faQuoteLeft);

import EtIcon from "./EtIcon.vue";
</script>
