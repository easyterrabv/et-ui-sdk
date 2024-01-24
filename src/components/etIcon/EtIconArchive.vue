<template>
    <EtIcon icon="archive" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArchive } from "@fortawesome/pro-regular-svg-icons";
library.add(faArchive);

import EtIcon from "./EtIcon.vue";
</script>
