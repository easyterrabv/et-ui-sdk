<template>
    <EtIcon icon="file-invoice" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFileInvoice } from "@fortawesome/pro-regular-svg-icons";
library.add(faFileInvoice);

import EtIcon from "./EtIcon.vue";
</script>
