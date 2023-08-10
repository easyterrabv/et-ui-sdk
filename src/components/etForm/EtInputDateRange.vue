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

import { UI_SIZING } from "../../enums";
import { OptionModel } from "../../models/Option";

export default defineComponent({
    props: {
        ...commonInputProps,
        modelValue: {
            type: Array as () => [Date | null, Date | null] | null,
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

            internalDateValue: null as [Date | null, Date | null] | null,

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
                this.internalDateValue = this.modelValue;
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
        firstDateDisplayFormat: (vm): string =>
            vm.firstDate ? dateToYMD(vm.firstDate) : "",
        secondDateDisplayFormat: (vm): string =>
            vm.secondDate ? dateToYMD(vm.secondDate) : ""
    },
    methods: {
        open() {
            if (this.isOpen) {
                return;
            }

            this.isOpen = true;
            this.$refs.popover.open();
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
                this.$refs.popover.hide();
            }
        },
        onInputChange(input: string, whatInput: "first" | "second") {
            const parsedDate = parseDate(input);

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
        "update:modelValue": (
            dates: [Date | null, Date | null] | null
        ): boolean => true
    }
});
</script>
