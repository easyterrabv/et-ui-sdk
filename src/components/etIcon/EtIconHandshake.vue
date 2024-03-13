<template>
    <EtIcon icon="handshake" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHandshake } from "@fortawesome/pro-regular-svg-icons";
library.add(faHandshake);

import EtIcon from "./EtIcon.vue";
</script>
