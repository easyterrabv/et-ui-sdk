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
    color: var(--et-sdk-dark-50);
    border-radius: 5px;
    padding: 10px 15px;
    font-weight: var(--et-sdk-font-weight-semibold);
    font-size: var(--et-sdk-font-size-normal);
    line-height: 20px;
    cursor: pointer;
}

.et-sdk-top-bar-item:hover {
    background-color: var(--et-sdk-dark-600);
    color: var(--et-sdk-light-0);
}

.et-sdk-top-bar-item__active {
    background-color: var(--et-sdk-dark-900);
    color: var(--et-sdk-light-0);
}
</style>
