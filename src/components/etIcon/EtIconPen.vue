<template>
    <EtIcon icon="pen" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/pro-regular-svg-icons";
library.add(faPen);

import EtIcon from "./EtIcon.vue";
</script>
