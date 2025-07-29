<template>
    <div
        class="et-sdk-input-date"
        ref="wrapper"
        :tabindex="-1"
        @keyup.esc="(e) => onEscape()"
    >
        <EtPopover ref="popover" class="et-sdk-input-date--popover">
            <template #toggle>
                <div class="et-sdk-input-date--input-toggle-wrapper">
                    <EtInput
                        ref="input"
                        :disabled="disabled"
                        :readonly="readonly"
                        :required="required"
                        :placeholder="placeholder"
                        :autocomplete="autocomplete"
                        :size="size"
                        :modelValue="internalInputValue"
                        @change="
                            (value: string | number | null) =>
                                (internalInputValue = value
                                    ? `${value}`
                                    : undefined)
                        "
                        @enter="onInputEnter"
                        @clear="onInputClear"
                        @blur="onInputBlur"
                        clearButton
                    >
                        <template #pre>
                            <EtIconCalendar />
                        </template>
                    </EtInput>
                </div>
            </template>
            <EtDatePicker
                @escape="() => onEscape()"
                @blur="() => onInputBlur()"
                @dateSelect="() => onDateSelect()"
                v-model="internalDateValue"
            ></EtDatePicker>
        </EtPopover>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EtPopover from "../EtPopover.vue";
import EtInput, { commonInputProps } from "./EtInput.vue";
import EtDatePicker from "../etDatePicker/EtDatePicker.vue";
import { parseDate } from "../../helpers/date";
import { wait } from "../../helpers/async";
import EtIconCalendar from "../etIcon/EtIconCalendar.vue";

import { UI_SIZING } from "../../helpers/enums";

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
            internalInputValue: undefined as string | undefined,
            internalDateValue: undefined as Date | undefined
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
                this.internalInputValue = undefined;
            }
        },
        internalInputValue() {
            const newValue = this.internalInputValue
                ? parseDate(this.internalInputValue)
                : undefined;

            this.internalDateValue = newValue || undefined;
        }
    },
    methods: {
        onEscape() {
            this.onInputBlur();
        },
        async onInputBlur() {
            // Important. Otherwise, this method will trigger before justToggleOption has a chance to be set.
            await this.$nextTick();
            await wait(150);

            const popoverElement = this.$refs.popover as any;
            if (popoverElement.isOpen()) {
                popoverElement.hideDropDown();
                return;
            }
        },
        onDateSelect() {
            if (this.closeOnSelect) {
                this.onInputBlur();
            }
        },
        onInputClear() {
            this.internalInputValue = undefined;
            this.internalDateValue = undefined;
        },
        async onInputEnter(
            value: string | number | undefined | null,
            e: Event
        ) {
            this.internalInputValue = value ? `${value}` : undefined;
        }
    }
});
</script>

<style>
.et-sdk-input-date {
    display: inline-block;
    width: 100%;
}

.et-sdk-input-date--popover {
    width: 100%;
}

.et-sdk-input-date--input-toggle-wrapper {
    position: relative;
}
</style>
