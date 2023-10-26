<template>
    <div
        class="et-sdk-top-bar-item"
        :class="{
            'et-sdk-top-bar-item__active': active
        }"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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

<style>
.et-sdk-top-bar-item {
    color: #f3f4f6;
    border-radius: 5px;
    padding: 10px 15px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
}

.et-sdk-top-bar-item:hover {
    background-color: #334155;
    color: white;
}

.et-sdk-top-bar-item__active {
    background-color: #0f172a;
    color: white;
}
</style>
