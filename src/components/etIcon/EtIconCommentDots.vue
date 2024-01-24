<template>
    <EtIcon icon="comment-dots" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCommentDots } from "@fortawesome/pro-regular-svg-icons";
library.add(faCommentDots);

import EtIcon from "./EtIcon.vue";
</script>
