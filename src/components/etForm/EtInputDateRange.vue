<template>
    <div class="et-input-date inline-block w-full" ref="wrapper" :tabindex="0">
        <EtPopover ref="popover" manual fitToggle class="w-full">
            <template #toggle>
                <EtInputGroup>
                    <div class="w-40 relative">
                        <EtInput
                            ref="input"
                            class="pl-10"
                            :modelValue="firstDateDisplayFormat"
                            @focus="onFirstInputFocus"
                            @blur="onFirstInputBlur"
                            @enter="(value) => onInputChange(value, 'first')"
                            @change="(value) => onInputChange(value, 'first')"
                        ></EtInput>
                        <span
                            class="absolute left-0 top-0 w-max h-max p-2 text-text-light"
                        >
                            <EtIconCalendar />
                        </span>
                    </div>
                    <EtInputGroupAddon> Until </EtInputGroupAddon>
                    <div class="w-40 relative">
                        <EtInput
                            ref="input"
                            class="pl-10"
                            @focus="onSecondInputFocus"
                            @blur="onSecondInputBlur"
                            :modelValue="secondDateDisplayFormat"
                            @enter="(value) => onInputChange(value, 'second')"
                            @change="(value) => onInputChange(value, 'second')"
                        ></EtInput>
                        <span
                            class="absolute left-0 top-0 w-max h-max p-2 text-text-light"
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
import { defineComponent } from "vue-demi";

import EtInputGroup from "src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "src/components/etForm/EtInputGroupAddon.vue";
import EtInput from "src/components/etForm/EtInput.vue";

import EtPopover from "src/components/EtPopover.vue";
import EtDatePicker from "src/components/etDatePicker/EtDatePicker.vue";
import { dateToYMD, parseDate } from "../../helpers/date";
import { wait } from "../../helpers/async";
import EtIconCalendar from "src/components/etIcon/EtIconCalendar.vue";

export default defineComponent({
    model: {
        // backwards compatibility with vue2.x
        prop: "modelValue",
        event: "update:modelValue"
    },
    props: {
        modelValue: {
            type: Date,
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
    }
});
</script>
