<template>
    <EtIcon icon="garage-open" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGarageOpen } from "@fortawesome/pro-regular-svg-icons";
library.add(faGarageOpen);

import EtIcon from "./EtIcon.vue";
</script>
