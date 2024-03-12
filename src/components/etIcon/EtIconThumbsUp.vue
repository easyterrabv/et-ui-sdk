<template>
    <EtIcon icon="thumbs-up" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsUp } from "@fortawesome/pro-regular-svg-icons";
library.add(faThumbsUp);

import EtIcon from "./EtIcon.vue";
</script>
