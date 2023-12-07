<template>
    <div class="et-sdk-input-date-range" ref="wrapper" :tabindex="-1">
        <EtPopover
            ref="popover"
            manual
            fitToggle
            class="et-sdk-input-date-range--popover"
        >
            <template #toggle>
                <EtInputGroup>
                    <div class="et-sdk-input-date-range--input-wrapper">
                        <EtInput
                            :name="name + '_first'"
                            ref="input"
                            :disabled="disabled"
                            :readonly="readonly"
                            :required="required"
                            :placeholder="placeholder"
                            :size="size"
                            :modelValue="firstDateDisplayFormat"
                            @focus="onFirstInputFocus"
                            @blur="onFirstInputBlur"
                            @enter="(value) => onInputChange(value, 'first')"
                            @change="(value) => onInputChange(value, 'first')"
                        >
                            <template #preIcon>
                                <EtIconCalendar />
                            </template>
                        </EtInput>
                    </div>

                    <EtInputGroupAddon>
                        <EtIconArrowRightLong />
                    </EtInputGroupAddon>
                    <div class="et-sdk-input-date-range--input-wrapper">
                        <EtInput
                            :name="name + '_second'"
                            ref="input"
                            :disabled="disabled"
                            :readonly="readonly"
                            :required="required"
                            :size="size"
                            @focus="onSecondInputFocus"
                            @blur="onSecondInputBlur"
                            :modelValue="secondDateDisplayFormat"
                            @enter="(value) => onInputChange(value, 'second')"
                            @change="(value) => onInputChange(value, 'second')"
                        >
                            <template #preIcon>
                                <EtIconCalendar />
                            </template>
                        </EtInput>
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
import { defineComponent, type PropType } from "vue";

import EtInputGroup from "./EtInputGroup.vue";
import EtInputGroupAddon from "./EtInputGroupAddon.vue";
import EtInput, { commonInputProps } from "./EtInput.vue";

import EtPopover from "../EtPopover.vue";
import EtDatePicker from "../etDatePicker/EtDatePicker.vue";
import { dateToYMD, isSameDates, parseDate } from "../../helpers/date";
import { wait } from "../../helpers/async";
import EtIconCalendar from "../etIcon/EtIconCalendar.vue";
import EtIconArrowRightLong from "../etIcon/EtIconArrowRightLong.vue";

import { UI_SIZING } from "../../helpers/enums";
import type { FilterDateValue } from "../etDataGrid/interfaces/DataGridMethods";

export default defineComponent({
    props: {
        ...commonInputProps,
        modelValue: {
            type: Object as PropType<FilterDateValue>,
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
        EtIconCalendar,
        EtIconArrowRightLong
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
                    newInternalValues[0] = parseDate(this.modelValue[0]);
                } else {
                    newInternalValues[0] = null;
                }

                if (this.modelValue?.length > 1) {
                    newInternalValues[1] = parseDate(this.modelValue[1]);
                } else {
                    newInternalValues[1] = null;
                }

                if (
                    this.isDifferent(newInternalValues, this.internalDateValue)
                ) {
                    this.internalDateValue = newInternalValues;
                }
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
        isDifferent(rayOne: Array<Date | null>, rayTwo: Array<Date | null>) {
            const rayOneValueOne = rayOne.length > 0 ? rayOne[0] : undefined;
            const rayOneValueTwo = rayOne.length > 1 ? rayOne[1] : undefined;
            const rayTwoValueOne = rayTwo.length > 0 ? rayTwo[0] : undefined;
            const rayTwoValueTwo = rayTwo.length > 1 ? rayTwo[1] : undefined;

            const valueOneBothDates =
                rayOneValueOne instanceof Date &&
                rayTwoValueOne instanceof Date;

            const valueTwoBothDates =
                rayOneValueTwo instanceof Date &&
                rayTwoValueTwo instanceof Date;

            return (
                rayOne.length !== rayTwo.length ||
                (valueOneBothDates
                    ? !isSameDates(rayOneValueOne, rayTwoValueOne)
                    : rayOneValueOne !== rayTwoValueOne) ||
                (valueTwoBothDates
                    ? !isSameDates(rayOneValueTwo, rayTwoValueTwo)
                    : rayOneValueTwo !== rayTwoValueTwo)
            );
        },
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

<style>
.et-sdk-input-date-range {
    display: inline-block;
    width: 100%;
}

.et-sdk-input-date-range--popover {
    width: 100%;
}

.et-sdk-input-date-range--input-wrapper {
    flex-grow: 1;
    min-width: 160px;
    position: relative;
}
</style>
