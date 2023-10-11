<template>
    <EtIcon icon="circle-dot" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleDot);

import EtIcon from "./EtIcon.vue";
</script>
