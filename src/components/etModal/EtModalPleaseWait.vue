<template>
    <EtModal>
        <template #header>
            <EtIconSpinner pulse />
            {{ title }}
        </template>
        <template #default v-if="content">
            {{ content }}
        </template>
    </EtModal>
</template>

<script setup lang="ts">
import EtModal from "./EtModal.vue";
import EtIconSpinner from "../etIcon/EtIconSpinner.vue";

const props = defineProps({
    title: {
        type: String,
        default: "Please wait"
    },
    content: {
        type: String,
        default: null
    }
});
</script>
