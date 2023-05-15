<template>
    <button class="bg-et-primary-color">
        {{ props.text }}
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue-demi';
const props = defineProps<{
    text?: string;
}>();
</script>