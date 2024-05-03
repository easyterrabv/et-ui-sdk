<template>
    <div
        class="et-sdk-input-wrapper"
        :tabindex="disabled ? 'none' : -1"
        :class="[
            wrapperClasses,
            {
                'et-sdk-input-wrapper__l': size === UI_SIZING.L,
                'et-sdk-input-wrapper__m': size === UI_SIZING.M,
                'et-sdk-input-wrapper__s': size === UI_SIZING.S,
                'et-sdk-input-wrapper__xs': size === UI_SIZING.XS,
                'et-sdk-input-wrapper__theme-normal': theme === 'normal',
                'et-sdk-input-wrapper__theme-grey': theme === 'grey',
                'et-sdk-input-wrapper__theme-gmail': theme === 'gmail',
                'et-sdk-input-wrapper__disabled': disabled,
                'et-sdk-input-wrapper__success': success,
                'et-sdk-input-wrapper__warning': warning,
                'et-sdk-input-wrapper__error': error
            }
        ]"
    >
        <span
            v-if="$slots.pre"
            class="et-sdk-input-pre et-sdk-input-peripheral"
            @click="focus"
        >
            <slot name="pre"></slot>
        </span>
        <div class="et-sdk-input--input-wrapper">
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
                    'et-sdk-input__with-pre-icon': $slots.pre,
                    'et-sdk-input__with-post-icon':
                        (clearButton && !$slots.post) ||
                        (!clearButton && $slots.post),
                    'et-sdk-input__disabled': disabled,
                    'et-sdk-input__success': success,
                    'et-sdk-input__warning': warning,
                    'et-sdk-input__error': error
                }"
                class="et-sdk-input"
            />
            <div
                v-if="$slots.overlay"
                class="et-sdk-input--overlay-content"
                :class="{
                    'et-sdk-input__with-pre-icon': $slots.pre,
                    'et-sdk-input__with-post-icon':
                        (clearButton && !$slots.post) ||
                        (!clearButton && $slots.post),
                    'et-sdk-input__disabled': disabled,
                    'et-sdk-input__success': success,
                    'et-sdk-input__warning': warning,
                    'et-sdk-input__error': error
                }"
            >
                <slot name="overlay" />
            </div>
        </div>
        <span
            class="et-sdk-input-clear et-sdk-input-peripheral"
            :class="{
                'et-sdk-input-clear__with-post-icon': $slots.post
            }"
            v-if="clearButton && !disabled && !readonly && internalData"
            @click.left.stop="clear"
        >
            <EtIconTimes />
        </span>
        <span
            v-if="$slots.post"
            class="et-sdk-input-post et-sdk-input-peripheral"
            @click="focus"
        >
            <slot name="post"></slot>
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
        type: String,
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
    },
    theme: {
        type: String as PropType<"normal" | "grey" | "gmail">,
        required: false,
        default: "normal"
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
    min-width: 100px;
    max-width: 100%;

    display: flex;
    flex-direction: row;

    border-radius: var(--et-sdk-input-border-radius);
    border: 1px solid var(--et-sdk-dark-300);

    &:focus-within {
        outline: none;
        box-shadow: 0 0 0 1px black;
    }
}

.et-sdk-input-peripheral {
    color: var(--et-sdk-dark-300);
    white-space: nowrap;

    &:focus {
        outline: none;
    }
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
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal);
    color: var(--et-sdk-dark-800);
    border-radius: var(--et-sdk-input-border-radius);
    outline: none;

    &:focus {
        outline: none;
    }
}

.et-sdk-input--input-wrapper {
    flex-grow: 1;
    position: relative;
    background: none;
    outline: none;

    &:focus {
        outline: none;
    }
}

.et-sdk-input-wrapper__theme-grey {
    background-color: var(--et-sdk-light-100);

    .et-sdk-input {
        border: none;
        background-color: var(--et-sdk-light-100);
    }
}

.et-sdk-input-wrapper__theme-gmail {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid var(--et-sdk-dark-200);
}

.et-sdk-input-wrapper__theme-gmail .et-sdk-input-pre {
    color: var(--et-sdk-dark-700);
}

.et-sdk-input-wrapper__theme-gmail .et-sdk-input {
    &::placeholder {
        color: var(--et-sdk-dark-300);
    }

    border-radius: 0;

    &.et-sdk-input__disabled {
        color: var(--et-sdk-dark-500);

        &::placeholder {
            color: var(--et-sdk-dark-200);
        }
    }
}

.et-sdk-input-wrapper__disabled {
    color: var(--et-sdk-dark-500);

    .et-sdk-input-peripheral {
        background-color: var(--et-sdk-dark-50);
        cursor: not-allowed;
    }
}

.et-sdk-input::placeholder {
    color: var(--et-sdk-dark-300);
}

.et-sdk-input-wrapper__xs .et-sdk-input,
.et-sdk-input-wrapper__xs .et-sdk-input--overlay-content {
    padding: 2px 6px;
}

.et-sdk-input-wrapper__s .et-sdk-input,
.et-sdk-input-wrapper__s .et-sdk-input--overlay-content {
    padding: 4px 10px;
}

.et-sdk-input-wrapper__m .et-sdk-input,
.et-sdk-input-wrapper__m .et-sdk-input--overlay-content {
    padding: 8px 14px;
}

.et-sdk-input-wrapper__l .et-sdk-input,
.et-sdk-input-wrapper__l .et-sdk-input--overlay-content {
    padding: 12px 18px;
}

.et-sdk-input__disabled {
    background-color: var(--et-sdk-dark-50);
    cursor: not-allowed;
}

.et-sdk-input__with-pre-icon {
    padding-left: 0 !important;
}

.et-sdk-input__with-post-icon {
    padding-right: 0 !important;
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

.et-sdk-input--overlay-content {
    position: absolute;
    top: 0;
    width: 100%;
    background-color: transparent;

    &:focus {
        outline: none;
    }
}
</style>
