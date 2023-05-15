<template>
    <button class="bg-primary">
        {{ props.text }}
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue-demi';
const props = defineProps<{
    text?: string;
}>();
</script>