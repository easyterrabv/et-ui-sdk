<template>
    <div class="et-input-date" :tabindex="0" @blur="(e) => onInputBlur()">
        <EtPopover ref="popover" manual>
            <template #toggle>
                <EtInput
                    ref="input"
                    :modelValue="internalInputValue"
                    @change="(value) => (internalInputValue = value)"
                    @enter="onInputEnter"
                    @focus="onInputFocus"
                    @clear="onInputClear"
                    clearButton
                ></EtInput>
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
        EtDatePicker
    },
    data() {
        return {
            internalInputValue: null as String | null,
            internalDateValue: null as Date | null
        };
    },
    watch: {
        internalDateValue() {
            this.$emit("update:modelValue", this.internalDateValue);
            this.internalInputValue = this.internalDateValue
                ? `${this.internalDateValue?.getFullYear()}-${
                      this.internalDateValue?.getMonth() + 1
                  }-${this.internalDateValue?.getDate()}`
                : null;
        },
        internalInputValue() {
            this.internalDateValue = this.internalInputValue
                ? parseDate(this.internalInputValue)
                : null;
        }
    },
    methods: {
        onInputFocus() {
            this.$refs.popover.focus();
        },
        onInputBlur() {
            this.$refs.popover.blur();
        },
        onInputClear() {
            this.internalInputValue = null;
            this.internalDateValue = null;
        },
        onInputEnter(value, e) {
            this.internalInputValue = value;
            this.onInputBlur();
        }
    }
});
</script>
