<template>
    <EtIcon icon="box-open" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBoxOpen } from "@fortawesome/pro-regular-svg-icons";
library.add(faBoxOpen);

import EtIcon from "./EtIcon.vue";
</script>
