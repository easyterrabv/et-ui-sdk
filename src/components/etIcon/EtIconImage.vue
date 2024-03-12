<template>
    <EtIcon icon="image" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faImage } from "@fortawesome/pro-regular-svg-icons";
library.add(faImage);

import EtIcon from "./EtIcon.vue";
</script>
