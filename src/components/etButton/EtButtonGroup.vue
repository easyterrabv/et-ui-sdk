<template>
    <div
        class="et-sdk-button-group"
        :class="{
            'et-sdk-button-group__vertical': isVertical,
            'et-sdk-button-group__horizontal': !isVertical
        }"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        isVertical: {
            type: Boolean,
            required: false,
            default: false
        }
    }
});
</script>

<style>
.et-sdk-button-group {
    display: flex;
    align-content: stretch;
}

.et-sdk-button-group > *,
.et-sdk-button-group > .et-sdk-popover .et-sdk-button /* see WYSIWYG link builder for use case */ {
    border-radius: 0 !important;
}

.et-sdk-button-group__vertical {
    flex-direction: column;
}

.et-sdk-button-group__horizontal > *:first-child {
    border-top-left-radius: var(--et-sdk-input-border-radius) !important;
    border-bottom-left-radius: var(--et-sdk-input-border-radius) !important;
}

.et-sdk-button-group__vertical > *:first-child,
.et-sdk-button-group__vertical > .et-sdk-popover:first-child .et-sdk-button {
    border-top-left-radius: var(--et-sdk-input-border-radius) !important;
    border-top-right-radius: var(--et-sdk-input-border-radius) !important;
}

.et-sdk-button-group__horizontal > *:last-child {
    border-top-right-radius: var(--et-sdk-input-border-radius) !important;
    border-bottom-right-radius: var(--et-sdk-input-border-radius) !important;
}

.et-sdk-button-group__vertical > *:last-child,
.et-sdk-button-group__vertical > .et-sdk-popover:last-child .et-sdk-button {
    border-bottom-left-radius: var(--et-sdk-input-border-radius) !important;
    border-bottom-right-radius: var(--et-sdk-input-border-radius) !important;
}

.et-sdk-button-group__vertical > .et-sdk-button-group > * /* In case of nested button groups */ {
    border-radius: 0 !important;
}

.et-sdk-button-group__vertical
    > .et-sdk-button-group:first-child
    > *:first-child {
    border-top-left-radius: var(--et-sdk-input-border-radius) !important;
}

.et-sdk-button-group__vertical
    > .et-sdk-button-group:first-child
    > *:last-child {
    border-top-right-radius: var(--et-sdk-input-border-radius) !important;
}

.et-sdk-button-group__vertical
    > .et-sdk-button-group:last-child
    > *:first-child {
    border-bottom-left-radius: var(--et-sdk-input-border-radius) !important;
}

.et-sdk-button-group__vertical
    > .et-sdk-button-group:last-child
    > *:last-child {
    border-bottom-right-radius: var(--et-sdk-input-border-radius) !important;
}

.et-sdk-button-group__horizontal {
    flex-direction: row;
}

.et-sdk-button-group__horizontal > * {
    flex-grow: 1;
}

.et-sdk-button-group__horizontal > .et-sdk-button:not(:last-child) {
    border-right: none;
}

.et-sdk-button-group__vertical > .et-sdk-button:not(:last-child) {
    border-bottom: none;
}
</style>
