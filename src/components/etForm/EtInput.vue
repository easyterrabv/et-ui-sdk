<template>
    <div class="relative et-input-wrapper">
        <input
            v-bind="$attrs"
            v-model="internalData"
            ref="et-input"
            type="text"
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
                    '!pr-10': clearButton
                }
            ]"
            class="et-input block w-full rounded-md border-0 ring-inset focus:ring-inset focus-visible:ring-0 focus-visible:ring-offset-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-default-light placeholder:text-default focus:ring-1 focus:ring-primary"
        />
        <span
            class="absolute right-0 top-0 w-max h-max p-2 cursor-pointer"
            v-if="clearButton && !disabled && !readonly && internalData"
            @mouseup.left.stop="clear"
        >
            <EtIconTimes />
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { generateId } from "src/helpers/random";

import EtIconTimes from "src/components/etIcon/EtIconTimes.vue";

export default defineComponent({
    inheritAttrs: false,
    components: {
        EtIconTimes
    },
    props: {
        name: {
            type: String,
            required: false,
            default() {
                return generateId(25, "input");
            }
        },
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
        autocomplete: {
            type: Boolean,
            required: false,
            default: false
        },
        value: {
            type: [String, Number],
            required: false,
            default: null
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
        size: {
            type: String,
            required: false,
            default: "m",
            validator(val) {
                const validSizes = ["xs", "s", "m", "l"];
                if (!validSizes.includes(val)) {
                    console.error(
                        "invalid input size, only choices:",
                        validSizes
                    );
                    return false;
                }
                return true;
            }
        },
        state: {
            type: String,
            required: false,
            default: "neutral",
            validator(val) {
                const validStates = ["error", "neutral", "valid"];
                if (!validStates.includes(val)) {
                    console.error(
                        "invalid input state, only choices:",
                        validStates
                    );
                    return false;
                }
                return true;
            }
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
        clearButton: {
            type: Boolean,
            required: false,
            default: false
        },
        trim: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            internalData: null as null | string | number,
            internalDataBefore: null as null | string | number
        };
    },
    computed: {
        typeIsNumber: (vm): boolean => ["number", "month"].includes(vm.type),
        typeIsString: (vm): boolean => !vm.typeIsNumber,
        minAttr: (vm): string => (vm.typeIsNumber ? "min" : "minLength"),
        maxAttr: (vm): string => (vm.typeIsNumber ? "max" : "maxlength")
    },
    watch: {
        internalData: {
            immediate: true,
            handler(value) {
                this.internalData = this.fixValue(value);
                this.$emit("input", this.internalData);
            }
        },
        value: {
            immediate: true,
            handler(value) {
                const data = this.fixValue(value);
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
        input: (value: string | number | null): boolean =>
            ["string", "number"].includes(typeof value) || value === null,
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
        blur: () => true
    }
});
</script>