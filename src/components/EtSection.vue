<template>
    <div class="et-sdk-section">
        <EtHeaderBlock class="et-sdk-section--header" v-if="$slots.header">
            <slot name="header"></slot>
        </EtHeaderBlock>
        <slot name="tabs"></slot>
        <div class="et-sdk-section--body" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtHeaderBlock from "./EtHeaderBlock.vue";
</script>

<style>
.et-sdk-section {
    padding: 0 !important;
}

.et-sdk-section--header {
    background-color: var(--et-sdk-light-100);
    font-size: var(--et-sdk-font-size-extra-large);
    line-height: 28px;
    height: var(--et-sdk-section-header-height);
    border-bottom: 0;
}

.et-sdk-section--body {
    padding: 15px;
}
</style>
