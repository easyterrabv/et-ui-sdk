<template>
    <EtIcon icon="inbox-in" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInboxIn } from "@fortawesome/pro-regular-svg-icons";
library.add(faInboxIn);

import EtIcon from "./EtIcon.vue";
</script>
