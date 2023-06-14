<template>
    <EtIcon icon="envelope" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope);

import EtIcon from "src/components/etIcon/EtIcon.vue";
</script>
