<template>
    <EtIcon icon="inbox" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
library.add(faInbox);

import EtIcon from "./EtIcon.vue";
</script>
