<template>
    <EtIcon icon="circle-minus" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleMinus);

import EtIcon from "./EtIcon.vue";
</script>
