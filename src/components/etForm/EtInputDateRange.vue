<template>
    <div class="et-input-date inline-block w-full" ref="wrapper" :tabindex="-1">
        <EtPopover ref="popover" manual fitToggle class="w-full">
            <template #toggle>
                <EtInputGroup>
                    <div class="w-40 relative">
                        <EtInput
                            :name="name + '_first'"
                            ref="input"
                            :disabled="disabled"
                            :readonly="readonly"
                            :required="required"
                            :placeholder="placeholder"
                            :size="size"
                            :class="[
                                {
                                    'pl-12': size === UI_SIZING.L,
                                    'pl-10': size === UI_SIZING.M,
                                    'pl-7': size === UI_SIZING.S
                                }
                            ]"
                            :modelValue="firstDateDisplayFormat"
                            @focus="onFirstInputFocus"
                            @blur="onFirstInputBlur"
                            @enter="(value) => onInputChange(value, 'first')"
                            @change="(value) => onInputChange(value, 'first')"
                        ></EtInput>
                        <span
                            class="absolute left-0 top-0 w-max h-max text-text-light"
                            :class="[
                                {
                                    'p-3': size === UI_SIZING.L,
                                    'p-2': size === UI_SIZING.M,
                                    'p-1': size === UI_SIZING.S
                                }
                            ]"
                        >
                            <EtIconCalendar />
                        </span>
                    </div>
                    <EtInputGroupAddon :size="size"> Until </EtInputGroupAddon>
                    <div class="w-40 relative">
                        <EtInput
                            :name="name + '_second'"
                            ref="input"
                            :disabled="disabled"
                            :readonly="readonly"
                            :required="required"
                            :size="size"
                            :class="[
                                {
                                    'pl-12': size === UI_SIZING.L,
                                    'pl-10': size === UI_SIZING.M,
                                    'pl-7': size === UI_SIZING.S
                                }
                            ]"
                            @focus="onSecondInputFocus"
                            @blur="onSecondInputBlur"
                            :modelValue="secondDateDisplayFormat"
                            @enter="(value) => onInputChange(value, 'second')"
                            @change="(value) => onInputChange(value, 'second')"
                        ></EtInput>
                        <span
                            class="absolute left-0 top-0 w-max h-max text-text-light"
                            :class="[
                                {
                                    'p-3': size === UI_SIZING.L,
                                    'p-2': size === UI_SIZING.M,
                                    'p-1': size === UI_SIZING.S
                                }
                            ]"
                        >
                            <EtIconCalendar />
                        </span>
                    </div>
                </EtInputGroup>
            </template>
            <EtDatePicker
                multiple
                v-model="internalDateValue"
                @blur="onPickerBlur"
                @focus="onPickerFocus"
                @onSecondChange="onSecondDateChange"
            />
        </EtPopover>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EtInputGroup from "./EtInputGroup.vue";
import EtInputGroupAddon from "./EtInputGroupAddon.vue";
import EtInput, { commonInputProps } from "./EtInput.vue";

import EtPopover from "../EtPopover.vue";
import EtDatePicker from "../etDatePicker/EtDatePicker.vue";
import { dateToYMD, parseDate } from "../../helpers/date";
import { wait } from "../../helpers/async";
import EtIconCalendar from "../etIcon/EtIconCalendar.vue";

import { UI_SIZING } from "../../helpers/enums";
import { OptionModel } from "../../models/Option";

export default defineComponent({
    props: {
        ...commonInputProps,
        modelValue: {
            type: Array,
            required: false,
            default: null
        },
        closeOnSelect: {
            type: Boolean,
            required: false,
            default: true
        }
    },
    components: {
        EtInputGroup,
        EtInputGroupAddon,
        EtPopover,
        EtInput,
        EtDatePicker,
        EtIconCalendar
    },
    data() {
        return {
            UI_SIZING,
            firstDateInput: null as String | null,
            secondDateInput: null as String | null,

            internalDateValue: [null, null] as Array<Date | null>,

            isOpen: false,
            currentFocus: null as "inputOne" | "inputTwo" | "datePicker" | null
        };
    },
    watch: {
        async internalDateValue() {
            this.$emit("update:modelValue", this.internalDateValue);
        },
        modelValue: {
            immediate: true,
            handler() {
                const newInternalValues: Array<Date | null> = [];
                if (this.modelValue?.length > 0) {
                    newInternalValues[0] = this.modelValue[0] as Date | null;
                } else {
                    newInternalValues[0] = null;
                }

                if (this.modelValue?.length > 1) {
                    newInternalValues[1] = this.modelValue[1] as Date | null;
                } else {
                    newInternalValues[1] = null;
                }

                this.internalDateValue = newInternalValues;
            }
        }
    },
    computed: {
        firstDate(): Date | null {
            return this.internalDateValue && this.internalDateValue.length > 0
                ? this.internalDateValue[0]
                : null;
        },
        secondDate(): Date | null {
            return this.internalDateValue && this.internalDateValue.length > 1
                ? this.internalDateValue[1]
                : null;
        },
        firstDateDisplayFormat(): string {
            return this.firstDate ? dateToYMD(this.firstDate) : "";
        },
        secondDateDisplayFormat(): string {
            return this.secondDate ? dateToYMD(this.secondDate) : "";
        }
    },
    methods: {
        open() {
            if (this.isOpen) {
                return;
            }

            this.isOpen = true;
            (this.$refs.popover as any).open();
        },
        onFirstInputFocus() {
            this.currentFocus = "inputOne";
            this.open();
        },
        onSecondInputFocus() {
            this.currentFocus = "inputTwo";
            this.open();
        },
        onPickerFocus() {
            this.currentFocus = "datePicker";
            this.open();
        },
        async onFirstInputBlur() {
            if (this.currentFocus === "inputOne") {
                this.currentFocus = null;
            }

            await this.onCommonBlur();
        },
        async onSecondInputBlur() {
            if (this.currentFocus === "inputTwo") {
                this.currentFocus = null;
            }

            await this.onCommonBlur();
        },
        async onPickerBlur() {
            if (this.currentFocus === "datePicker") {
                this.currentFocus = null;
            }

            await this.onCommonBlur();
        },
        async onCommonBlur() {
            await wait(150);
            if (!this.currentFocus) {
                this.isOpen = false;
                (this.$refs.popover as any).hide();
            }
        },
        onInputChange(
            input: string | number | null,
            whatInput: "first" | "second"
        ) {
            const parsedDate = input ? parseDate(input) : null;

            if (whatInput === "first") {
                const currentSecond =
                    this.secondDate ||
                    parseDate(this.secondDateDisplayFormat) ||
                    null;
                this.internalDateValue = [parsedDate, currentSecond];
            } else if (whatInput === "second") {
                const currentFirst =
                    this.firstDate ||
                    parseDate(this.firstDateDisplayFormat) ||
                    null;
                this.internalDateValue = [currentFirst, parsedDate];
            }
        },
        onSecondDateChange() {
            this.currentFocus = null;
            this.onCommonBlur();
        }
    },
    emits: {
        "update:modelValue": (dates: Array<Date | null> | null): boolean => true
    }
});
</script>
