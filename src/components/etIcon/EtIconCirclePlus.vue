<template>
    <EtIcon icon="circle-plus" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCirclePlus } from "@fortawesome/pro-regular-svg-icons";
library.add(faCirclePlus);

import EtIcon from "./EtIcon.vue";
</script>
