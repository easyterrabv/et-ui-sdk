<template>
    <EtIcon icon="comments" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faComments } from "@fortawesome/pro-regular-svg-icons";
library.add(faComments);

import EtIcon from "./EtIcon.vue";
</script>
