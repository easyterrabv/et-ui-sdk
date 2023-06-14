<template>
    <EtIcon icon="italic" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faItalic } from "@fortawesome/free-solid-svg-icons";
library.add(faItalic);

import EtIcon from "src/components/etIcon/EtIcon.vue";
</script>
