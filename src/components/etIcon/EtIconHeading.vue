<template>
    <EtIcon icon="heading" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeading } from "@fortawesome/pro-regular-svg-icons";
library.add(faHeading);

import EtIcon from "./EtIcon.vue";
</script>
