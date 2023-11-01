<template>
    <div class="et-sdk-input-group">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style>
.et-sdk-input-group {
    display: flex;
    flex-direction: row;
}

.et-sdk-input-group > *,
.et-sdk-input-group .et-sdk-input,
.et-sdk-input-group .et-sdk-input-like {
    border-radius: 0 !important;
}

.et-sdk-input-group > .et-sdk-input-wrapper {
    flex-grow: 1;
}

/* ignoring sdk-input-group class in case of nested groups */
.et-sdk-input-group > *:not(.et-sdk-input-group):first-child,
.et-sdk-input-group > *:not(.et-sdk-input-group):first-child .et-sdk-input,
.et-sdk-input-group > *:first-child .et-sdk-input-like {
    border-top-left-radius: 6px !important;
    border-bottom-left-radius: 6px !important;
}

.et-sdk-input-group > *:not(.et-sdk-input-group):last-child,
.et-sdk-input-group > *:not(.et-sdk-input-group):last-child .et-sdk-input,
.et-sdk-input-group > *:last-child .et-sdk-input-like {
    border-top-right-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
}
</style>
