<template>
    <EtIcon icon="list-ol" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faListOl } from "@fortawesome/pro-regular-svg-icons";
library.add(faListOl);

import EtIcon from "./EtIcon.vue";
</script>
