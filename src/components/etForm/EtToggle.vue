<template>
    <div
        class="et-sdk-toggle"
        :class="{
            'et-sdk-toggle__xs': size === UI_SIZING.XS,
            'et-sdk-toggle__s': size === UI_SIZING.S,
            'et-sdk-toggle__m': size === UI_SIZING.M,
            'et-sdk-toggle__l': size === UI_SIZING.L
        }"
    >
        <button
            type="button"
            @mouseup.left.stop="(e) => clickDebounce.debounce(e)"
            @keyup.enter="(e) => clickDebounce.debounce(e)"
            class="et-sdk-toggle--button"
            :class="{
                'et-sdk-toggle--button__not-checked': !internalChecked,
                'et-sdk-toggle--button__checked': internalChecked,
                'et-sdk-toggle--button__disabled': disabled,
                'et-sdk-toggle--button__disabled__checked':
                    disabled && internalChecked
            }"
            role="switch"
        >
            <span
                class="et-sdk-toggle--handle"
                :class="{
                    'et-sdk-toggle--handle__not-checked': !internalChecked,
                    'et-sdk-toggle--handle__checked': internalChecked,
                    'et-sdk-toggle--handle__disabled': disabled
                }"
            ></span>
        </button>
        <label class="et-sdk-toggle--text" v-if="$slots.default">
            <slot></slot>
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { Debounce } from "../../helpers/debounce";
import { UI_SIZING } from "../../helpers/enums";

export default defineComponent({
    model: {
        // backwards compatibility with vue2.x
        prop: "modelValue",
        event: "update:modelValue"
    },
    props: {
        size: {
            required: false,
            type: String as PropType<UI_SIZING>,
            default: UI_SIZING.S
        },
        disabled: {
            required: false,
            type: Boolean,
            default: false
        },
        modelValue: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            UI_SIZING,
            internalChecked: false,
            clickDebounce: new Debounce((...args) => {
                this.onClick(...args);
            }, 100)
        };
    },
    methods: {
        onClick(event: Event) {
            if (this.disabled) {
                event.preventDefault();
                return;
            }

            this.internalChecked = !this.internalChecked;
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler() {
                if (this.disabled) {
                    this.$emit("update:modelValue", this.internalChecked);
                    return;
                }

                this.internalChecked = this.modelValue;

                // Null guard
                if (!this.internalChecked) {
                    this.internalChecked = false;
                }
            }
        },
        internalChecked: {
            immediate: true,
            handler() {
                this.$emit("update:modelValue", this.internalChecked);
            }
        }
    },
    emits: {
        "update:modelValue": (modelValue: boolean): boolean => true
    }
});
</script>

<style>
.et-sdk-toggle {
    display: flex;
    align-items: center;
}

.et-sdk-toggle--button {
    display: flex;
    flex: none;
    cursor: pointer;
    border-radius: 9999px;
    padding: 1px;
    box-shadow: var(--et-sdk-shadow-normal);

    transition: background-color 200ms ease-in-out;
}

.et-sdk-toggle--button__not-checked {
    background-color: var(--et-sdk-dark-50);
}

.et-sdk-toggle--button__checked {
    background-color: var(--et-sdk-blue-600);
}

.et-sdk-toggle--button__disabled {
    cursor: not-allowed;
}

.et-sdk-toggle--button__disabled__checked {
    background-color: var(--et-sdk-blue-400);
}

.et-sdk-toggle__xs .et-sdk-toggle--button {
    width: 16px;
}

.et-sdk-toggle__s .et-sdk-toggle--button {
    width: 32px;
}

.et-sdk-toggle__m .et-sdk-toggle--button {
    width: 44px;
}

.et-sdk-toggle__l .et-sdk-toggle--button {
    width: 52px;
}

.et-sdk-toggle--handle {
    border-radius: 9999px;
    background-color: var(--et-sdk-light-0);
    box-shadow: var(--et-sdk-shadow-normal);
    transition: all 200ms ease-in-out;
}

.et-sdk-toggle--handle__not-checked {
    transform: translateX(0px);
}

.et-sdk-toggle--handle__checked {
    transform: translateX(calc(100% - 0.125rem));
}

.et-sdk-toggle--handle__disabled {
    background-color: var(--et-sdk-dark-50);
}

.et-sdk-toggle__xs .et-sdk-toggle--handle {
    width: 8px;
    height: 8px;
}

.et-sdk-toggle__s .et-sdk-toggle--handle {
    width: 16px;
    height: 16px;
}

.et-sdk-toggle__m .et-sdk-toggle--handle {
    width: 24px;
    height: 24px;
}

.et-sdk-toggle__l .et-sdk-toggle--handle {
    width: 32px;
    height: 32px;
}

.et-sdk-toggle--text {
    padding-left: 8px;
}

.et-sdk-toggle__xs .et-sdk-toggle--text {
    font-size: var(--et-sdk-font-size-tiny);
}

.et-sdk-toggle__s .et-sdk-toggle--text {
    font-size: var(--et-sdk-font-size-small);
}

.et-sdk-toggle__m .et-sdk-toggle--text {
    font-size: var(--et-sdk-font-size-normal);
}

.et-sdk-toggle__l .et-sdk-toggle--text {
    font-size: var(--et-sdk-font-size-large);
}
</style>
