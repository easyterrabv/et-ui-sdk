<template>
    <EtIcon icon="mouse-pointer" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMousePointer } from "@fortawesome/pro-regular-svg-icons";
library.add(faMousePointer);

import EtIcon from "./EtIcon.vue";
</script>
