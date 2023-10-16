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
            internalInputValue: "" as string | undefined,
            internalTimeValue: undefined as Array<number> | undefined,

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
                popoverElement.hide();
                return;
            }

            popoverElement.open();
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

            if (this.hasInteraction) {
                this.hasInteraction = false;
                return;
            }

            const popoverElement = this.$refs.popover as any;
            if (popoverElement.isOpen()) {
                popoverElement.hide();
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
