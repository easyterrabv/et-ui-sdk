<template>
    <EtIcon icon="times" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes);

import EtIcon from "./EtIcon.vue";
</script>
