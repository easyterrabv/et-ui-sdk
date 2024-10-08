<template>
    <button
        ref="etButton"
        type="button"
        class="et-sdk-button"
        :class="[
            {
                'et-sdk-button__disabled': internalDisabled,
                'et-sdk-button__readonly': readonly,
                'et-sdk-button__active': active
            },
            'et-sdk-button__' + type,
            'et-sdk-button__' + size
        ]"
        @click.left.stop="(e) => clickDebounce.debounce(e)"
        @keyup.enter="(e) => clickDebounce.debounce(e)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { UI_TYPES } from "../../helpers/enums";
import { Debounce } from "../../helpers/debounce";
import { type ISharedButtonProps, propDefaults } from "./IEtButtonStatic";

interface ButtonProps extends ISharedButtonProps {
    type?: string;
}

const props = withDefaults(defineProps<ButtonProps>(), {
    ...propDefaults,
    type: UI_TYPES.DEFAULT
});

const emit = defineEmits<{
    (e: "click", event: Event): void;
    (e: "focus"): void;
    (e: "blur"): void;
}>();

const etButton = ref<HTMLButtonElement | null>(null);

const internalDisabled = computed(() => {
    if (typeof props.disabled === "boolean") {
        return props.disabled;
    }
    return props.disabled?.();
});

const onClick = (event: Event) => {
    if (internalDisabled.value || props.readonly) {
        event.preventDefault();
        return;
    }
    emit("click", event);
};

const clickDebounce = new Debounce(onClick, 100);

const focus = () => {
    etButton.value?.focus();
};

const blur = () => {
    etButton.value?.blur();
};

// Expose methods to parent components
defineExpose({ focus, blur });
</script>

<style>
.et-sdk-button {
    border-radius: var(--et-sdk-input-border-radius);
    font-weight: var(--et-sdk-font-weight-semibold);

    /*Default styling*/
    background-color: var(--et-sdk-light-0);
    color: var(--et-sdk-dark-800);

    /* size M styling */
    padding: 8px 12px;
    font-size: var(--et-sdk-font-size-normal-s);
    line-height: 20px;

    transition: background-color 150ms ease-in-out;
}

.et-sdk-button__default {
    border: 1px solid var(--et-sdk-dark-300);
}

.et-sdk-button:hover:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ),
.et-sdk-button__active:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ) {
    background-color: var(--et-sdk-dark-200);
}

.et-sdk-button__disabled,
.et-sdk-button__disabled:hover {
    background-color: var(--et-sdk-dark-100);
    cursor: not-allowed;
}

.et-sdk-button__primary {
    border: 1px solid var(--et-sdk-blue-600);
    background-color: var(--et-sdk-blue-600);
    color: var(--et-sdk-light-0);
}

.et-sdk-button__primary:hover:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ),
.et-sdk-button__active.et-sdk-button__primary:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ) {
    border: 1px solid var(--et-sdk-blue-700);
    background-color: var(--et-sdk-blue-700);
}

.et-sdk-button__disabled.et-sdk-button__primary,
.et-sdk-button__disabled.et-sdk-button__primary:hover {
    border: 1px solid var(--et-sdk-blue-400);
    background-color: var(--et-sdk-blue-400);
}

.et-sdk-button__success {
    border: 1px solid var(--et-sdk-success-500);
    background-color: var(--et-sdk-success-500);
    color: var(--et-sdk-light-0);
}

.et-sdk-button__success:hover:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ),
.et-sdk-button__active.et-sdk-button__success:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ) {
    border: 1px solid var(--et-sdk-success-700);
    background-color: var(--et-sdk-success-700);
}

.et-sdk-button__disabled.et-sdk-button__success,
.et-sdk-button__disabled.et-sdk-button__success:hover {
    border: 1px solid var(--et-sdk-success-300);
    background-color: var(--et-sdk-success-300);
}

.et-sdk-button__danger {
    border: 1px solid var(--et-sdk-danger-500);
    background-color: var(--et-sdk-danger-500);
    color: var(--et-sdk-light-0);
}

.et-sdk-button__danger:hover:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ),
.et-sdk-button__active.et-sdk-button__danger:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ) {
    border: 1px solid var(--et-sdk-danger-700);
    background-color: var(--et-sdk-danger-700);
}

.et-sdk-button__disabled.et-sdk-button__danger,
.et-sdk-button__disabled.et-sdk-button__danger:hover {
    border: 1px solid var(--et-sdk-danger-300);
    background-color: var(--et-sdk-danger-300);
}

.et-sdk-button__warning {
    border: 1px solid var(--et-sdk-warning-500);
    background-color: var(--et-sdk-warning-500);
    color: var(--et-sdk-light-0);
}

.et-sdk-button__warning:hover:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ),
.et-sdk-button__active.et-sdk-button__warning:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ) {
    border: 1px solid var(--et-sdk-warning-700);
    background-color: var(--et-sdk-warning-700);
}

.et-sdk-button__disabled.et-sdk-button__warning,
.et-sdk-button__disabled.et-sdk-button__warning:hover {
    border: 1px solid var(--et-sdk-warning-300);
    background-color: var(--et-sdk-warning-300);
}

.et-sdk-button__text {
    border: 1px solid transparent;
    background-color: transparent;
}

.et-sdk-button__text:hover:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ),
.et-sdk-button__active.et-sdk-button__text:not(.et-sdk-button__readonly):not(
        .et-sdk-button__disabled
    ) {
    border: 1px solid transparent;
    background-color: var(--et-sdk-dark-50);
}

.et-sdk-button__disabled.et-sdk-button__text,
.et-sdk-button__disabled.et-sdk-button__text:hover {
    border: 1px solid transparent;
    background-color: transparent;
    color: var(--et-sdk-dark-500);
}

.et-sdk-button__readonly {
    cursor: default;
}

.et-sdk-button__xs {
    padding: 4px 8px;
    font-size: var(--et-sdk-font-size-tiny);
    line-height: 16px;
}

.et-sdk-button__s {
    padding: 6px 10px;
    font-size: var(--et-sdk-font-size-normal);
    line-height: 20px;
}

.et-sdk-button__l {
    padding: 10px 14px;
    font-size: var(--et-sdk-font-size-large);
    line-height: 24px;
}
</style>
