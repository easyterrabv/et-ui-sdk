<template>
    <EtIcon icon="bug" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBug } from "@fortawesome/pro-regular-svg-icons";
library.add(faBug);

import EtIcon from "./EtIcon.vue";
</script>
