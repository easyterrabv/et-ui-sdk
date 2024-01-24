<template>
    <EtIcon prefix="fas" icon="user-headset" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserHeadset } from "@fortawesome/pro-solid-svg-icons";
library.add(faUserHeadset);

import EtIcon from "./EtIcon.vue";
</script>
