<template>
    <EtIcon icon="expand-alt" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faExpandAlt } from "@fortawesome/pro-regular-svg-icons";
library.add(faExpandAlt);

import EtIcon from "./EtIcon.vue";
</script>
