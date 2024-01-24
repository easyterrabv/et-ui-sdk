<template>
    <EtIcon icon="user-xmark" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserXmark } from "@fortawesome/pro-regular-svg-icons";
library.add(faUserXmark);

import EtIcon from "./EtIcon.vue";
</script>
