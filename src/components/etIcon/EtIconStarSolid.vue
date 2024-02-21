<template>
    <EtIcon prefix="fas" icon="star" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
library.add(faStar);

import EtIcon from "./EtIcon.vue";
</script>
