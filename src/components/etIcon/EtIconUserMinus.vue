<template>
    <EtIcon icon="user-minus" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserMinus } from "@fortawesome/pro-regular-svg-icons";
library.add(faUserMinus);

import EtIcon from "./EtIcon.vue";
</script>
