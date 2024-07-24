<template>
    <div class="et-sdk-layout-content">
        <slot name="header"></slot>
        <div v-if="$slots.default" class="et-sdk-layout-content--content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style>
.et-sdk-layout-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
    max-height: 100%;
}

.et-sdk-layout-content--content {
    height: 100%;
    max-height: 100%;
    overflow: auto;
    padding: 20px;
}
</style>
