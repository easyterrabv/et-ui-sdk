<template>
    <EtIcon prefix="fas" icon="user" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/pro-solid-svg-icons";
library.add(faUser);

import EtIcon from "./EtIcon.vue";
</script>
