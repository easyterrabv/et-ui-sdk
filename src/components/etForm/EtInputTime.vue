<template>
    <div
        class="et-sdk-input-time"
        ref="wrapper"
        :tabindex="-1"
        @keyup.esc="(e) => onEscape()"
    >
        <EtPopover ref="popover" class="et-sdk-input-time--popover">
            <template #toggle>
                <div class="et-sdk-input-time--input-wrapper">
                    <EtInput
                        ref="input"
                        :modelValue="internalInputValue"
                        :name="name"
                        :autocomplete="autocomplete"
                        :disabled="disabled"
                        :readonly="readonly"
                        :required="required"
                        :placeholder="placeholder"
                        :size="size"
                        @change="
                            (value) =>
                                (internalInputValue = value
                                    ? `${value}`
                                    : undefined)
                        "
                        @enter="onInputEnter"
                        @clear="onInputClear"
                        @blur="onInputBlur"
                        clearButton
                    ></EtInput>
                </div>
            </template>
            <EtTimePicker
                @escape="(e) => onEscape()"
                @blur="(e) => onInputBlur()"
                v-model="internalTimeValue"
            ></EtTimePicker>
        </EtPopover>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EtPopover from "../EtPopover.vue";
import EtTimePicker from "../etDatePicker/EtTimePicker.vue";
import EtInput, { commonInputProps } from "./EtInput.vue";
import { wait } from "../../helpers/async";
import { addLeadingZero } from "../../helpers/misc";

export default defineComponent({
    props: {
        ...commonInputProps,
        modelValue: {
            type: Array,
            required: false,
            default: null
        }
    },
    components: {
        EtPopover,
        EtInput,
        EtTimePicker
    },
    data() {
        return {
            internalInputValue: "" as string | undefined,
            internalTimeValue: undefined as Array<number> | undefined
        };
    },
    watch: {
        async internalTimeValue() {
            this.internalInputValue = [
                this.internalTimeValue
                    ? addLeadingZero(this.internalTimeValue[0])
                    : 0,
                this.internalTimeValue
                    ? addLeadingZero(this.internalTimeValue[1])
                    : 0
            ].join(":");
        },
        internalInputValue() {
            const splitInput = this.internalInputValue?.split(/[-_:\s]/);
            this.internalTimeValue = [
                splitInput ? parseInt(splitInput[0]) : 0,
                splitInput ? parseInt(splitInput[1]) : 0
            ];
        },
        modelValue: {
            immediate: true,
            deep: true,
            handler() {
                this.internalTimeValue = this.modelValue as number[];
            }
        }
    },
    methods: {
        async onInputClick() {
            if (this.disabled || this.readonly) {
                return;
            }

            const popoverElement = this.$refs.popover as any;

            if (popoverElement.isOpen()) {
                popoverElement.hideDropDown();
                return;
            }

            await popoverElement.showDropDown();
        },
        async onInputEnter(value: string | number | null, e: Event) {
            this.internalInputValue = String(value);
        },
        onInputClear() {
            this.internalInputValue = undefined;
            this.internalTimeValue = undefined;
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
        onEscape() {
            this.onInputBlur();
        }
    }
});
</script>

<style>
.et-sdk-input-time {
    display: inline-block;
    width: 100%;
}

.et-sdk-input-time--popover {
    width: 100%;
}

.et-sdk-input-time--input-wrapper {
    position: relative;
}
</style>
