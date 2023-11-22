<template>
    <EtIcon prefix="far" icon="circle-right" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleRight } from "@fortawesome/free-regular-svg-icons";
library.add(faCircleRight);

import EtIcon from "./EtIcon.vue";
</script>
