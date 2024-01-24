<template>
    <EtIcon icon="link" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink } from "@fortawesome/pro-regular-svg-icons";
library.add(faLink);

import EtIcon from "./EtIcon.vue";
</script>
