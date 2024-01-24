<template>
    <EtIcon icon="list-ul" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faListUl } from "@fortawesome/pro-regular-svg-icons";
library.add(faListUl);

import EtIcon from "./EtIcon.vue";
</script>
