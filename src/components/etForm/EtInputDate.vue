<template>
    <div
        class="et-input-date inline-block"
        ref="wrapper"
        :tabindex="0"
        @blur="(e) => setPopoverFocus(false)"
    >
        <EtPopover ref="popover" manual fitToggle>
            <template #toggle>
                <div class="relative">
                    <EtInput
                        ref="input"
                        class="pl-10"
                        :modelValue="internalInputValue"
                        @change="(value) => (internalInputValue = value)"
                        @enter="onInputEnter"
                        @focus="(e) => setPopoverFocus(true)"
                        @blur="(e) => setPopoverFocus(false)"
                        @clear="onInputClear"
                        clearButton
                    ></EtInput>

                    <span
                        class="absolute left-0 top-0 w-max h-max p-2 text-text-light"
                    >
                        <EtIconCalendar />
                    </span>
                </div>
            </template>
            <EtDatePicker v-model="internalDateValue"></EtDatePicker>
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
            internalDateValue: null as Date | null
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
                await this.setPopoverFocus(false);
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
        async setPopoverFocus(focus) {
            if (focus) {
                await this.$refs.popover.open();
                // this.$refs.wrapper.focus();
            } else {
                await wait(50);
                await this.$refs.popover.hide();
                this.$refs.wrapper.blur();
            }
        },
        onInputClear() {
            this.internalInputValue = null;
            this.internalDateValue = null;
        },
        async onInputEnter(value, e) {
            this.internalInputValue = value;
            await this.setPopoverFocus(false);
        }
    }
});
</script>
