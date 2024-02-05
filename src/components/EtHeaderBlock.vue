<template>
    <div class="et-sdk-header-block">
        <div class="et-sdk-header-block--content">
            <slot></slot>
        </div>
        <div v-if="$slots.actions" class="et-sdk-header-block--actions">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style>
.et-sdk-header-block {
    display: flex;
    flex-direction: row;

    font-weight: var(--et-sdk-font-weight-semibold);
    font-size: var(--et-sdk-font-size-extra-large);
    line-height: 28px;

    /* force height to be at least 64px. Needed in flex environments */
    min-height: 64px;
    height: 64px;

    border-bottom: 1px solid var(--et-sdk-dark-200);
}

.et-sdk-header-block--content {
    display: flex;
    flex-grow: 1;
    padding-left: 15px;
    padding-right: 15px;
    align-items: center;
}

.et-sdk-header-block--actions {
    padding-left: 15px;
    padding-right: 15px;
    display: flex;
    align-items: center;
}
</style>
