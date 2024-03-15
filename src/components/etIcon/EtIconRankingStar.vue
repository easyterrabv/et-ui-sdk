<template>
    <EtIcon icon="ranking-star" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faRankingStar } from "@fortawesome/pro-regular-svg-icons";
library.add(faRankingStar);

import EtIcon from "./EtIcon.vue";
</script>
