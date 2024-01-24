<template>
    <EtIcon icon="ellipsis-vertical" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
library.add(faEllipsisVertical);

import EtIcon from "./EtIcon.vue";
</script>
