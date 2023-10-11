<template>
    <EtIcon icon="house" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
library.add(faHouse);

import EtIcon from "./EtIcon.vue";
</script>
