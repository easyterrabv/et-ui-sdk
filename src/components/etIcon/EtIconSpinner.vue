<template>
    <EtIcon icon="spinner" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
library.add(faSpinner);

import EtIcon from "./EtIcon.vue";
</script>
