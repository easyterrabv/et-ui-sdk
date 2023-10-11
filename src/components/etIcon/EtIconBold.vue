<template>
    <EtIcon icon="bold" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBold } from "@fortawesome/free-solid-svg-icons";
library.add(faBold);

import EtIcon from "./EtIcon.vue";
</script>
