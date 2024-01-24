<template>
    <EtIcon icon="user-times" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserTimes } from "@fortawesome/pro-regular-svg-icons";
library.add(faUserTimes);

import EtIcon from "./EtIcon.vue";
</script>
