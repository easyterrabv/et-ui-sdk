<template>
    <div
        class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
        :class="{
            'bg-gray-900 text-white': active
        }"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
    props: {
        active: {
            required: false,
            type: Boolean,
            default: false
        }
    }
});
</script>
