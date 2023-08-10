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
                        class="w-full"
                        :modelValue="internalInputValue"
                        :name="name"
                        :autocomplete="autocomplete"
                        :disabled="disabled"
                        :readonly="readonly"
                        :required="required"
                        :placeholder="placeholder"
                        :size="size"
                        @change="(value) => (internalInputValue = value)"
                        @enter="onInputEnter"
                        @clear="onInputClear"
                        @blur="onInputBlur"
                        clearButton
                    ></EtInput>
                </div>
            </template>
            <EtTimePicker
                @escape="(e) => onEscape()"
                @interaction="onInteraction"
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
            internalInputValue: "" as String,
            internalTimeValue: null as Array<Number> | null,

            hasInteraction: false as Boolean
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
                this.internalTimeValue = this.modelValue;
            }
        }
    },
    methods: {
        async onInputClick() {
            if (this.disabled || this.readonly) {
                return;
            }

            if (this.$refs.popover.isOpen()) {
                this.$refs.popover.hide();
                return;
            }
            this.$refs.popover.open();
        },
        async onInputEnter(value, e) {
            this.internalInputValue = value;
        },
        onInputClear() {
            this.internalInputValue = null;
            this.internalTimeValue = null;
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
        onEscape() {
            this.hasInteraction = false;
            this.onInputBlur();
        },
        onInteraction() {
            this.hasInteraction = true;
        }
    }
});
</script>
