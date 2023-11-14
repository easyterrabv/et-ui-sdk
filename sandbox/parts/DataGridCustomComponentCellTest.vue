<template>
    <a :href="'mailto:' + rawContent" @click.stop="">
        <slot></slot>
    </a>
</template>

<script setup lang="ts">
import type {PropType} from "vue";

const props = defineProps({
    column: {
        type: Object,
        required: true
    },
    row: {
        type: Object,
        required: false,
        default(){
            return {};
        }
    },
    rawContent: {
        type: String as PropType<unknown>,
        required: false,
        default: ''
    },
    formattedContent: {
        type: String as PropType<unknown>,
        required: false,
        default: ''
    }
});
</script>

<style scoped>
a {
    color: #1d4ed8;
    text-decoration: underline;
}
</style>