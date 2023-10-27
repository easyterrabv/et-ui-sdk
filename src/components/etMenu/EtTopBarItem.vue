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
    color: var(--et-sdk-light-100);
    border-radius: 5px;
    padding: 10px 15px;
    font-weight: 600;
    font-size: var(--et-sdk-font-size-normal);
    cursor: pointer;
}

.et-sdk-top-bar-item:hover {
    background-color: var(--et-sdk-dark-600);
    color: white;
}

.et-sdk-top-bar-item__active {
    background-color: var(--et-sdk-dark-900);
    color: white;
}
</style>
