<template>
    <EtIcon icon="user-secret" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/pro-regular-svg-icons";
library.add(faUserSecret);

import EtIcon from "./EtIcon.vue";
</script>
