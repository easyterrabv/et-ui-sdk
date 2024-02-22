<template>
    <EtIcon prefix="fas" icon="circle-info" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/pro-solid-svg-icons";
library.add(faCircleInfo);

import EtIcon from "./EtIcon.vue";
</script>
