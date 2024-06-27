<template>
    <EtIcon prefix="fas" icon="car" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCar } from "@fortawesome/pro-solid-svg-icons";
library.add(faCar);

import EtIcon from "./EtIcon.vue";
</script>
