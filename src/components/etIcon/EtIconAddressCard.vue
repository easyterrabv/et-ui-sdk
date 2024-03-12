<template>
    <EtIcon icon="address-card" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAddressCard } from "@fortawesome/pro-regular-svg-icons";
library.add(faAddressCard);

import EtIcon from "./EtIcon.vue";
</script>
