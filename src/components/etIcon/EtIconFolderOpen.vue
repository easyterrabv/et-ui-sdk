<template>
    <EtIcon icon="folder-open" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFolderOpen } from "@fortawesome/pro-regular-svg-icons";
library.add(faFolderOpen);

import EtIcon from "./EtIcon.vue";
</script>
