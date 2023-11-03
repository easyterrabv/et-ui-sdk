<template>
    <label class="et-sdk-label">
        <slot></slot>
    </label>
</template>

<script setup lang="ts"></script>

<style>
.et-sdk-label {
    display: block;
    font-size: var(--et-sdk-font-size-small);
    font-weight: var(--et-sdk-font-weight-normal);
    line-height: 16px;
}
</style>
