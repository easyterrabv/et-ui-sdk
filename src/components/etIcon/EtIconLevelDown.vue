<template>
    <EtIcon icon="level-down-alt" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLevelDownAlt } from "@fortawesome/pro-regular-svg-icons";
library.add(faLevelDownAlt);

import EtIcon from "./EtIcon.vue";
</script>
