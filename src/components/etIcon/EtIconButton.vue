<template>
    <EtIcon icon="tablet-button" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTabletButton } from "@fortawesome/pro-regular-svg-icons";
library.add(faTabletButton);

import EtIcon from "./EtIcon.vue";
</script>
