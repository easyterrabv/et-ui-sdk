<template>
    <EtIcon icon="level-up-alt" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLevelUpAlt } from "@fortawesome/pro-regular-svg-icons";
library.add(faLevelUpAlt);

import EtIcon from "./EtIcon.vue";
</script>
