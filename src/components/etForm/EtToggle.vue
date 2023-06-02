<template>
    <div class="flex items-center">
        <button
            type="button"
            @mouseup.left.stop="(e) => clickDebounce.debounce(e)"
            @keyup.enter="(e) => clickDebounce.debounce(e)"
            class="flex flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :class="[
                {
                    'bg-default-extra-light': !internalChecked,
                    'bg-primary': internalChecked,
                    '!cursor-not-allowed': disabled,
                    'bg-primary-light': disabled && internalChecked
                },
                sizeClasses.button
            ]"
            role="switch"
        >
            <span
                class="transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                :class="[
                    {
                        'translate-x-0': !internalChecked,
                        'translate-x-[calc(100%-0.125rem)]': internalChecked,
                        '!bg-default-light': disabled && !internalChecked,
                        '!bg-default-extra-light': disabled && internalChecked
                    },
                    sizeClasses.handle
                ]"
            ></span>
        </button>
        <label
            class="text-text pl-2"
            v-if="$slots.default"
            :class="[sizeClasses.text]"
        >
            <slot></slot>
        </label>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue-demi";
import { Debounce } from "../../helpers/debounce";
import { UI_SIZING } from "../../enums";

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
            default: UI_SIZING.M
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
            internalChecked: false,
            clickDebounce: new Debounce(this.onClick, 100),

            sizeMapping: {
                [UI_SIZING.S]: {
                    button: "w-8",
                    handle: "h-4 w-4",
                    text: "text-sm"
                },
                [UI_SIZING.M]: {
                    button: "w-12",
                    handle: "h-6 w-6",
                    text: "text-base"
                }
            } as {
                [key in UI_SIZING]: {
                    button: string;
                    handle: string;
                    text: string;
                };
            }
        };
    },
    computed: {
        sizeClasses: (vm): string => vm.sizeMapping[vm.size]
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
