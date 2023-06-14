<template>
    <EtIcon icon="trash" />
</template>

<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash);

import EtIcon from "src/components/etIcon/EtIcon.vue";
</script>
