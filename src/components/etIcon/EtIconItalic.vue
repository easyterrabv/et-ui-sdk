<template>
    <EtIcon icon="italic" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faItalic } from "@fortawesome/pro-regular-svg-icons";
library.add(faItalic);

import EtIcon from "./EtIcon.vue";
</script>
