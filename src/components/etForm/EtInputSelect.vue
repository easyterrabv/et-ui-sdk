<template>
    <div
        class="et-input-date inline-block w-80"
        ref="wrapper"
        :tabindex="-1"
        @keyup.esc="(e) => onEscape()"
    >
        <EtPopover ref="popover" manual fitToggle>
            <template #toggle>
                <div @mouseup.left.stop="(e) => onInputClick()">
                    <EtInput
                        ref="input"
                        :size="size"
                        v-show="hasInputFocus"
                        v-model="internalFilterValue"
                        @clear="onInputClear"
                        @blur="onInputBlur"
                        clearButton
                    ></EtInput>
                    <div
                        v-show="!hasInputFocus"
                        :tabindex="0"
                        :class="[sizeClasses]"
                        class="et-input-like block cursor-text rounded-md border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-text shadow-sm ring-1 ring-default-light placeholder:text-text-light focus:ring-1 focus:ring-primary transition-colors duration-200 ease-in-out"
                    >
                        <span
                            v-if="
                                internalOptionValue &&
                                !multiple &&
                                !Array.isArray(internalOptionValue)
                            "
                        >
                            {{ internalOptionValue.label }}
                        </span>
                        <span
                            v-if="
                                internalOptionValue &&
                                multiple &&
                                Array.isArray(internalOptionValue)
                            "
                        >
                            <EtBadgeDefault
                                class="mr-2"
                                v-for="option in internalOptionValue"
                                :key="option.guid"
                            >
                                {{ option.label }}
                                <span
                                    class="cursor-pointer"
                                    @mouseup.left.stop="
                                        (e) => deSelectOption(option)
                                    "
                                >
                                    <EtIconTimes />
                                </span>
                            </EtBadgeDefault>
                        </span>
                    </div>
                </div>
            </template>
            <EtSelect
                ref="select"
                @optionToggled="onOptionToggle"
                v-model="internalOptionValue"
                :filter="internalFilterValue"
                :options="options"
                :multiple="multiple"
            />
        </EtPopover>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

import EtPopover from "src/components/EtPopover.vue";
import EtInput from "src/components/etForm/EtInput.vue";
import EtBadgeDefault from "src/components/etBadge/EtBadgeDefault.vue";
import EtSelect from "src/components/etSelect/EtSelect.vue";
import EtIconTimes from "src/components/etIcon/EtIconTimes.vue";

import { wait } from "../../helpers/async";
import { OptionModel } from "../../models/Option";

import { commonInputProps } from "src/components/etForm/EtInput.vue";
import { UI_SIZING } from "../../enums";

export default defineComponent({
    model: {
        // backwards compatibility with vue2.x
        prop: "modelValue",
        event: "update:modelValue"
    },
    props: {
        options: {
            type: Array<OptionModel>,
            required: true
        },
        modelValue: {
            type: Date,
            required: false,
            default: null
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        ...commonInputProps
    },
    components: {
        EtIconTimes,
        EtPopover,
        EtInput,
        EtSelect,
        EtBadgeDefault
    },
    data() {
        return {
            internalFilterValue: null as String | null,
            internalOptionValue: null as OptionModel | OptionModel[] | null,

            hasInputFocus: false as Boolean,
            justToggledOption: false,

            sizeMapping: {
                [UI_SIZING.S]: "h-8 px-2.5 py-1",
                [UI_SIZING.M]: "h-10 px-3.5 py-2"
            } as { [key in UI_SIZING]: string }
        };
    },
    computed: {
        sizeClasses: (vm): string => vm.sizeMapping[vm.size]
    },
    watch: {
        modelValue: {
            immediate: true,
            handler() {
                this.internalOptionValue = this.modelValue;
            }
        },
        internalOptionValue() {
            this.$emit("update:modelValue", this.internalOptionValue);
        }
    },
    methods: {
        async onInputClick() {
            if (this.$refs.popover.isOpen()) {
                this.$refs.popover.hide();
                this.internalFilterValue = null;
                this.hasInputFocus = false;
                return;
            }
            this.hasInputFocus = true;
            this.$refs.popover.open();
            await this.$nextTick();
            this.$refs.input.focus();
        },
        onEscape() {
            this.$refs.popover.hide();
            this.onInputBlur();
        },
        onOptionToggle() {
            this.$refs.input.focus();
            this.justToggledOption = true;
        },
        async onInputBlur() {
            // Important. Otherwise, this method will trigger before justToggleOption has a chance to be set.
            await this.$nextTick();
            await wait(150);

            if (this.justToggledOption) {
                this.justToggledOption = false;
                return;
            }

            await this.onInputClick();
        },
        onInputClear() {
            this.internalFilterValue = null;
        },
        deSelectOption(option: OptionModel) {
            this.$refs.select.deSelectOption(option);
        }
    }
});
</script>