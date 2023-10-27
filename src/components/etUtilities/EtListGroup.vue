<template>
    <ul class="et-sdk-list-group">
        <slot></slot>
    </ul>
</template>

<script setup lang="ts"></script>

<style>
.et-sdk-list-group {
    display: inline-block;
    border: 1px solid var(--et-sdk-dark-200);
    border-radius: 8px;
}

.et-sdk-list-group > li {
    line-height: 40px;
    padding-left: 15px;
    padding-right: 15px;
}

.et-sdk-list-group > li:not(:last-child) {
    border-bottom: 1px solid var(--et-sdk-dark-200);
}
</style>
