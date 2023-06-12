<template>
    <div
        class="et-input-date inline-block w-full"
        ref="wrapper"
        :tabindex="0"
        @keyup.esc="(e) => onEscape()"
    >
        <EtPopover ref="popover" manual fitToggle>
            <template #toggle>
                <div
                    class="relative"
                    @mouseup.left.stop="(e) => onInputClick()"
                >
                    <EtInput
                        ref="input"
                        class="pl-10"
                        :modelValue="internalInputValue"
                        @change="(value) => (internalInputValue = value)"
                        @enter="onInputEnter"
                        @clear="onInputClear"
                        @blur="onInputBlur"
                        clearButton
                    ></EtInput>

                    <span
                        class="absolute left-0 top-0 w-max h-max p-2 text-text-light"
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

import EtPopover from "src/components/EtPopover.vue";
import EtInput from "src/components/etForm/EtInput.vue";
import EtDatePicker from "src/components/etDatePicker/EtDatePicker.vue";
import { parseDate } from "../../helpers/date";
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
        EtPopover,
        EtInput,
        EtDatePicker,
        EtIconCalendar
    },
    data() {
        return {
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
                // await this.setPopoverFocus(false);
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
