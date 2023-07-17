<template>
    <div
        class="relative et-input-wrapper w-80 max-w-full"
        :class="[wrapperClasses]"
    >
        <input
            v-bind="$attrs"
            v-model="internalData"
            ref="et-input"
            :type="type"
            :name="name"
            :autocomplete="autocomplete ? 'off' : 'on'"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :required="required"
            :[minAttr]="min"
            :[maxAttr]="max"
            @keyup="emitKeyup"
            @keyup.enter="enterEmit"
            @focus="handleFocusEmit"
            @blur="handleBlurEmit"
            :class="[
                {
                    '!pr-10': clearButton,
                    'bg-default-extra-light cursor-not-allowed': disabled,
                    '!ring-success-light': success,
                    '!ring-warning-light': warning,
                    '!ring-danger-light': error
                },
                sizeClasses
            ]"
            class="et-input block w-full rounded-md border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-text shadow-sm ring-1 ring-default-light placeholder:text-text-light focus:ring-1 focus:ring-primary transition-colors duration-200 ease-in-out"
        />
        <span
            class="absolute right-0 top-0 w-max h-max cursor-pointer text-text-light"
            :class="[
                {
                    'p-2': size === UI_SIZING.M,
                    'p-1': size === UI_SIZING.S
                }
            ]"
            v-if="clearButton && !disabled && !readonly && internalData"
            @mouseup.left.stop="clear"
        >
            <EtIconTimes />
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue-demi";
import { generateId } from "../../helpers/random";

import EtIconTimes from "../etIcon/EtIconTimes.vue";
import { UI_SIZING } from "../../enums";

export const commonInputProps = {
    name: {
        type: String,
        required: false,
        default() {
            return generateId(25, "input");
        }
    },
    autocomplete: {
        type: Boolean,
        required: false,
        default: false
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    readonly: {
        type: Boolean,
        required: false,
        default: false
    },
    required: {
        type: Boolean,
        required: false,
        default: false
    },
    placeholder: {
        type: String,
        required: false,
        default: ""
    },
    size: {
        required: false,
        type: String as PropType<UI_SIZING>,
        default: UI_SIZING.M
    },
    type: {
        type: String,
        required: false,
        default: "text"
    },
    error: {
        type: Boolean,
        required: false,
        default: false
    },
    warning: {
        type: Boolean,
        required: false,
        default: false
    },
    success: {
        type: Boolean,
        required: false,
        default: false
    }
};

export default defineComponent({
    model: {
        // backwards compatibility with vue2.x
        prop: "modelValue",
        event: "update:modelValue"
    },
    inheritAttrs: false,
    components: {
        EtIconTimes
    },
    props: {
        min: {
            type: [Number, String],
            required: false,
            default: null
        },
        max: {
            type: [Number, String],
            required: false,
            default: null
        },
        type: {
            type: String,
            required: false,
            default: "text",
            validator(val) {
                const validTypes = [
                    "text",
                    "email",
                    "hidden",
                    "month",
                    "password",
                    "number",
                    "search",
                    "tel",
                    "url"
                ];
                if (!validTypes.includes(val)) {
                    console.error(
                        "invalid input type, only choices:",
                        validTypes
                    );
                    return false;
                }
                return true;
            }
        },
        modelValue: {
            type: [String, Number],
            required: false,
            default: null
        },
        clearButton: {
            type: Boolean,
            required: false,
            default: false
        },
        trim: {
            type: Boolean,
            required: false,
            default: false
        },
        wrapperClasses: {
            type: String,
            required: false,
            default: ""
        },
        ...commonInputProps
    },
    data() {
        return {
            UI_SIZING,
            internalData: null as null | string | number,
            internalDataBefore: null as null | string | number,

            sizeMapping: {
                [UI_SIZING.S]: "px-2.5 py-1",
                [UI_SIZING.M]: "px-3.5 py-2"
            } as { [key in UI_SIZING]: string }
        };
    },
    computed: {
        typeIsNumber: (vm): boolean => ["number", "month"].includes(vm.type),
        typeIsString: (vm): boolean => !vm.typeIsNumber,
        minAttr: (vm): string => (vm.typeIsNumber ? "min" : "minLength"),
        maxAttr: (vm): string => (vm.typeIsNumber ? "max" : "maxlength"),
        sizeClasses: (vm): string => vm.sizeMapping[vm.size]
    },
    watch: {
        internalData: {
            immediate: true,
            handler(value) {
                this.internalData = this.fixValue(value);
                this.$emit("update:modelValue", this.internalData);
            }
        },
        modelValue: {
            immediate: true,
            handler(modelValue) {
                const data = this.fixValue(modelValue);
                const beforeData = this.fixValue(this.internalData);

                if (data !== beforeData) {
                    this.$emit("change", data);
                    this.internalDataBefore = data;
                }

                this.internalData = data;
            }
        }
    },
    methods: {
        fixValue(
            value: string | number | boolean | null
        ): string | number | null {
            if (this.typeIsNumber && typeof value !== "number") {
                // the input components expects values to be a number. But the value is not a number.
                switch (typeof value) {
                    case "string":
                        return parseInt(value);
                    case "boolean":
                        return value ? 1 : 0;
                }
            }

            if (this.typeIsString && typeof value !== "string") {
                // the input components expects values to be a string. But the value is not a string.
                switch (typeof value) {
                    case "number":
                        return `${value}`;
                    case "boolean":
                        return value ? "true" : "false";
                }
            }

            if (typeof value === "number" || typeof value === "string") {
                return value;
            }

            return null;
        },
        emitKeyup(event) {
            if (this.disabled || this.readonly) {
                return;
            }
            this.$emit("keyup", event);
        },
        enterEmit(event) {
            if (this.disabled || this.readonly) {
                return;
            }
            this.$emit("enter", this.internalData, event);
        },
        handleFocusEmit() {
            this.$emit("focus");
        },
        handleBlurEmit() {
            this.$emit("blur");

            if (this.internalData && this.trim && this.typeIsString) {
                this.internalData = this.internalData.trim();
            }

            const data = this.fixValue(this.internalData);
            const beforeData = this.internalDataBefore;

            if (data !== beforeData) {
                this.$emit("change", data);
                this.internalDataBefore = data;
            }
        },
        focus() {
            this.$refs["et-input"].focus();
        },
        blur() {
            this.$refs["et-input"].blur();
        },
        getValue(): string | number | null {
            return this.internalData;
        },
        async setValue(value: string | number | null): Promise<void> {
            await new Promise((resolve) => {
                this.internalData = value;
                resolve();
            });
        },
        async clear(): Promise<void> {
            await this.setValue(null).then(() => {
                this.$emit("clear");
            });
        }
    },
    emits: {
        // will trigger and usually only update the v-model value
        "update:modelValue": (modelValue: string | number | null): boolean =>
            ["string", "number"].includes(typeof modelValue) ||
            modelValue === null,
        // will trigger if there is an actual change
        change: (value: string | number | null): boolean =>
            ["string", "number"].includes(typeof value) || value === null,
        // Will trigger on each key up stroke
        keyup: (event: Event): boolean => !!event,
        // Will trigger on each enter key up stroke
        enter: (value: string | number | null, event: Event): boolean => {
            return (
                ["string", "number"].includes(typeof value) ||
                (value === null && !!event)
            );
        },
        // Will trigger on input focus
        focus: () => true,
        // Will trigger on input blur
        blur: () => true,
        // Will trigger on input blur
        clear: () => true
    }
});
</script>
