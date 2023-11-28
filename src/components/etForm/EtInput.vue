<template>
    <div
        class="et-sdk-input-wrapper"
        :class="[
            wrapperClasses,
            {
                'et-sdk-input-wrapper__l': size === UI_SIZING.L,
                'et-sdk-input-wrapper__m': size === UI_SIZING.M,
                'et-sdk-input-wrapper__s': size === UI_SIZING.S,
                'et-sdk-input-wrapper__xs': size === UI_SIZING.XS
            }
        ]"
    >
        <span v-if="$slots.preIcon" class="et-sdk-input-pre">
            <slot name="preIcon"></slot>
        </span>
        <input
            v-bind="$attrs"
            v-model="internalData"
            ref="et-sdk-input"
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
            :class="{
                'et-sdk-input__with-pre-icon': $slots.preIcon,
                'et-sdk-input__with-post-icon':
                    (clearButton && !$slots.postIcon) ||
                    (!clearButton && $slots.postIcon),
                'et-sdk-input__with-post-icon-and_clear':
                    clearButton && $slots.postIcon,
                'et-sdk-input__disabled': disabled,
                'et-sdk-input__success': success,
                'et-sdk-input__warning': warning,
                'et-sdk-input__error': error
            }"
            class="et-sdk-input"
        />
        <span
            class="et-sdk-input-clear"
            :class="{
                'et-sdk-input-clear__with-post-icon': $slots.postIcon
            }"
            v-if="clearButton && !disabled && !readonly && internalData"
            @mouseup.left.stop="clear"
        >
            <EtIconTimes />
        </span>
        <span v-if="$slots.postIcon" class="et-sdk-input-post">
            <slot name="postIcon"></slot>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { generateId } from "../../helpers/random";

import EtIconTimes from "../etIcon/EtIconTimes.vue";
import { UI_SIZING } from "../../helpers/enums";

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
        default: "text",
        validator(val: string) {
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
                console.error("invalid input type, only choices:", validTypes);
                return false;
            }
            return true;
        }
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
            internalDataBefore: null as null | string | number
        };
    },
    computed: {
        typeIsNumber(): boolean {
            return ["number", "month"].includes(this.type);
        },
        typeIsString(): boolean {
            return !this.typeIsNumber;
        },
        minAttr(): string {
            return this.typeIsNumber ? "min" : "minLength";
        },
        maxAttr(): string {
            return this.typeIsNumber ? "max" : "maxlength";
        }
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

            // typeof NaN === "number" - true
            if (
                this.typeIsNumber &&
                typeof value === "number" &&
                isNaN(value)
            ) {
                return null;
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
        emitKeyup(event: KeyboardEvent) {
            if (this.disabled || this.readonly) {
                return;
            }
            this.$emit("keyup", event);
        },
        enterEmit(event: KeyboardEvent) {
            if (this.disabled || this.readonly) {
                return;
            }
            this.blur();
            this.$emit("enter", this.internalData, event);
        },
        handleFocusEmit() {
            this.$emit("focus");
        },
        handleBlurEmit() {
            this.$emit("blur");

            if (
                this.internalData &&
                this.trim &&
                this.typeIsString &&
                typeof this.internalData === "string"
            ) {
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
            (this.$refs["et-sdk-input"] as any).focus();
        },
        blur() {
            (this.$refs["et-sdk-input"] as any).blur();
        },
        getValue(): string | number | null {
            return this.internalData;
        },
        async setValue(value: string | number | null): Promise<void> {
            await new Promise<void>((resolve) => {
                this.internalData = value;
                resolve();
            });
        },
        async clear(): Promise<void> {
            await this.setValue(null).then(() => {
                this.$emit("clear");
            });
        },
        setSelectionRange(start: number, end: number) {
            (this.$refs["et-sdk-input"] as any).setSelectionRange(start, end);
        }
    },
    emits: {
        // will trigger and usually only update the v-model value
        "update:modelValue"(modelValue: string | number | null): boolean {
            return (
                ["string", "number"].includes(typeof modelValue) ||
                modelValue === null
            );
        },
        // will trigger if there is an actual change
        change(value: string | number | null): boolean {
            return (
                ["string", "number"].includes(typeof value) || value === null
            );
        },
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
        // Will trigger on input clear
        clear: () => true
    }
});
</script>

<style>
.et-sdk-input-wrapper {
    position: relative;
    min-width: 100px;
    max-width: 100%;
}

.et-sdk-input-pre {
    position: absolute;
    left: 0;
    top: 0;
    height: max-content;
    width: max-content;
    color: var(--et-sdk-dark-300);
}

.et-sdk-input-wrapper__l .et-sdk-input-pre,
.et-sdk-input-wrapper__l .et-sdk-input-clear,
.et-sdk-input-wrapper__l .et-sdk-input-post {
    padding: 12px;
}

.et-sdk-input-wrapper__m .et-sdk-input-pre,
.et-sdk-input-wrapper__m .et-sdk-input-clear,
.et-sdk-input-wrapper__m .et-sdk-input-post {
    padding: 8px;
}

.et-sdk-input-wrapper__s .et-sdk-input-pre,
.et-sdk-input-wrapper__s .et-sdk-input-clear,
.et-sdk-input-wrapper__s .et-sdk-input-post {
    padding: 4px;
}

.et-sdk-input-wrapper__xs .et-sdk-input-pre,
.et-sdk-input-wrapper__xs .et-sdk-input-clear,
.et-sdk-input-wrapper__xs .et-sdk-input-post {
    padding: 2px;
}

.et-sdk-input {
    display: block;
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--et-sdk-dark-200);
    box-shadow: var(--et-sdk-shadow-normal);
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal);
    line-height: 20px;
    color: var(--et-sdk-dark-800);
}

.et-sdk-input::placeholder {
    color: var(--et-sdk-dark-300);
}

.et-sdk-input-wrapper__xs .et-sdk-input {
    padding: 2px 6px;
}

.et-sdk-input-wrapper__s .et-sdk-input {
    padding: 4px 10px;
}

.et-sdk-input-wrapper__m .et-sdk-input {
    padding: 8px 14px;
}

.et-sdk-input-wrapper__l .et-sdk-input {
    padding: 12px 18px;
}

.et-sdk-input__disabled {
    background-color: var(--et-sdk-dark-50);
    cursor: not-allowed;
}

.et-sdk-input__with-pre-icon {
    padding-left: 30px !important;
}

.et-sdk-input__with-post-icon {
    padding-right: 30px !important;
}

.et-sdk-input__with-post-icon-and_clear {
    padding-right: 60px !important;
}

.et-sdk-input__success {
    border-color: var(--et-sdk-success-300);
}

.et-sdk-input__warning {
    border-color: var(--et-sdk-warning-300);
}

.et-sdk-input__error {
    border-color: var(--et-sdk-danger-300);
}

.et-sdk-input-clear {
    position: absolute;
    right: 0;
    top: 0;
    width: max-content;
    height: max-content;
    cursor: pointer;
    color: var(--et-sdk-dark-300);
}

.et-sdk-input-clear__with-post-icon {
    right: 24px;
}

.et-sdk-input-post {
    position: absolute;
    right: 0;
    top: 0;
    height: max-content;
    width: max-content;
    color: var(--et-sdk-dark-300);
}
</style>
