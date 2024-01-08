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
        @mouseup.left.stop="(e) => clickDebounce.debounce(e)"
        @keyup.enter="(e) => clickDebounce.debounce(e)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { UI_SIZING, UI_TYPES } from "../../helpers/enums";
import { Debounce } from "../../helpers/debounce";

interface iButtonColoring {
    default: string;
    readonly: string;
    active: string;
    disabled: string;
}

export const sharedButtonProps = {
    disabled: { required: false, type: [Boolean, Function], default: false },
    readonly: { required: false, type: Boolean, default: false },
    active: { required: false, type: Boolean, default: false },
    size: {
        required: false,
        type: String as PropType<UI_SIZING>,
        default: UI_SIZING.M
    }
};

export default defineComponent({
    props: {
        ...sharedButtonProps,
        type: {
            required: false,
            type: String as PropType<UI_TYPES>,
            default: UI_TYPES.DEFAULT
        }
    },
    data() {
        return {
            clickDebounce: new Debounce(this.onClick, 100)
        };
    },
    computed: {
        internalDisabled() {
            if (typeof this.disabled === "boolean") {
                return this.disabled;
            }
            return this.disabled?.();
        }
    },
    methods: {
        onClick(event: Event) {
            if (this.internalDisabled || this.readonly) {
                event.preventDefault();
                return;
            }

            this.$emit("click", event);
        },
        focus() {
            (this.$refs.etButton as HTMLButtonElement).focus();
        },
        blur() {
            (this.$refs.etButton as HTMLButtonElement).blur();
        }
    },
    expose: ["focus", "blur"],
    emits: {
        click: (event: Event) => !!event,
        focus: () => true,
        blur: () => true
    }
});
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
