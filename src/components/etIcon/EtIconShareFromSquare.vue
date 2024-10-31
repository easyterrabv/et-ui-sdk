<template>
    <EtIcon icon="share-from-square" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShareFromSquare } from "@fortawesome/pro-regular-svg-icons";
library.add(faShareFromSquare);

import EtIcon from "./EtIcon.vue";
</script>
