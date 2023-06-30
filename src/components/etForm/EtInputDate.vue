<template>
    <div
        class="et-input-date inline-block w-full"
        ref="wrapper"
        :tabindex="-1"
        @keyup.esc="(e) => onEscape()"
    >
        <EtPopover ref="popover" manual fitToggle class="w-full">
            <template #toggle>
                <div
                    class="relative"
                    @mouseup.left.stop="(e) => onInputClick()"
                >
                    <EtInput
                        ref="input"
                        :disabled="disabled"
                        :readonly="readonly"
                        :required="required"
                        :placeholder="placeholder"
                        :autocomplete="autocomplete"
                        :size="size"
                        class="pl-10 w-full"
                        :modelValue="internalInputValue"
                        @change="(value) => (internalInputValue = value)"
                        @enter="onInputEnter"
                        @clear="onInputClear"
                        @blur="onInputBlur"
                        clearButton
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
            </template>
            <EtDatePicker
                @escape="(e) => onEscape()"
                @interaction="onInteraction"
                @blur="(e) => onInputBlur()"
                @dateSelect="(value) => onDateSelect(value)"
                v-model="internalDateValue"
            ></EtDatePicker>
        </EtPopover>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

import EtPopover from "../EtPopover.vue";
import EtInput, { commonInputProps } from "./EtInput.vue";
import EtDatePicker from "../etDatePicker/EtDatePicker.vue";
import { parseDate } from "../../helpers/date";
import { wait } from "../../helpers/async";
import EtIconCalendar from "../etIcon/EtIconCalendar.vue";

import { UI_SIZING } from "../../enums";

export default defineComponent({
    props: {
        ...commonInputProps,
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
        EtPopover,
        EtInput,
        EtDatePicker,
        EtIconCalendar
    },
    data() {
        return {
            UI_SIZING,
            internalInputValue: null as String | null,
            internalDateValue: null as Date | null,

            hasInteraction: false as Boolean
        };
    },
    watch: {
        async internalDateValue() {
            this.$emit("update:modelValue", this.internalDateValue);

            if (this.internalDateValue) {
                const year = this.internalDateValue?.getFullYear();
                const month = this.internalDateValue?.getMonth();
                const date = this.internalDateValue?.getDate();
                this.internalInputValue = `${year}-${month + 1}-${date}`;
            } else {
                this.internalInputValue = null;
            }
        },
        internalInputValue() {
            this.internalDateValue = this.internalInputValue
                ? parseDate(this.internalInputValue)
                : null;
        }
    },
    methods: {
        async onInputClick() {
            if (this.$refs.popover.isOpen()) {
                this.$refs.popover.hide();
                return;
            }
            this.$refs.popover.open();
        },
        onEscape() {
            this.hasInteraction = false;
            this.onInputBlur();
        },
        async onInputBlur() {
            // Important. Otherwise, this method will trigger before justToggleOption has a chance to be set.
            await this.$nextTick();
            await wait(150);

            if (this.hasInteraction) {
                this.hasInteraction = false;
                return;
            }

            if (this.$refs.popover.isOpen()) {
                this.$refs.popover.hide();
                return;
            }
        },

        onDateSelect(value) {
            if (this.closeOnSelect) {
                this.hasInteraction = false;
                this.onInputBlur();
            }
        },

        onInteraction() {
            this.hasInteraction = true;
        },
        onInputClear() {
            this.internalInputValue = null;
            this.internalDateValue = null;
        },
        async onInputEnter(value, e) {
            this.internalInputValue = value;
        }
    }
});
</script>
