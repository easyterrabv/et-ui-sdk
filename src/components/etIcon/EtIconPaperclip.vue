<template>
    <EtIcon icon="paperclip" />
</template>

<script setup lang="ts">
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
library.add(faPaperclip);

import EtIcon from "./EtIcon.vue";
</script>
