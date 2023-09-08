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
                        class="et-input-like pr-10 relative block cursor-text rounded-md border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-text shadow-sm ring-1 ring-default-light placeholder:text-text-light focus:ring-1 focus:ring-primary transition-colors duration-200 ease-in-out"
                    >
                        <div
                            class="w-full scrollbar-none whitespace-nowrap overflow-x-auto"
                            v-if="
                                internalOptionValue &&
                                ((multiple &&
                                    Array.isArray(internalOptionValue) &&
                                    internalOptionValue.length > 0) ||
                                    (!multiple &&
                                        !Array.isArray(internalOptionValue)))
                            "
                        >
                            <span
                                v-if="
                                    multiple &&
                                    !Array.isArray(internalOptionValue)
                                "
                            >
                                {{ internalOptionValue.label }}
                            </span>
                            <span
                                v-if="
                                    multiple &&
                                    internalOptionValue &&
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
                        <span
                            :class="[chevronSizeClasses]"
                            class="absolute right-0 top-0 w-max h-max cursor-pointer hover:bg-default-extra-light text-text-light ring-default-light ring-1 bg-white rounded-md"
                        >
                            <EtIconChevronDown />
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
import { defineComponent } from "vue";

import EtPopover from "../EtPopover.vue";
import EtInput from "./EtInput.vue";
import EtBadgeDefault from "../etBadge/EtBadgeDefault.vue";
import EtSelect from "../etSelect/EtSelect.vue";
import EtIconTimes from "../etIcon/EtIconTimes.vue";
import EtIconChevronDown from "../etIcon/EtIconChevronDown.vue";

import { wait } from "../../helpers/async";
import { OptionModel } from "../../models/Option";

import { commonInputProps } from "./EtInput.vue";
import { UI_SIZING } from "../../enums";

export default defineComponent({
    props: {
        options: {
            type: Array<OptionModel>,
            required: true
        },
        modelValue: {
            type: [OptionModel, Array<OptionModel>],
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
        EtIconChevronDown,
        EtIconTimes,
        EtPopover,
        EtInput,
        EtSelect,
        EtBadgeDefault
    },
    data() {
        return {
            internalFilterValue: "",
            internalOptionValue: undefined as
                | OptionModel
                | OptionModel[]
                | undefined,

            hasInputFocus: false as Boolean,
            justToggledOption: false,

            sizeMapping: {
                [UI_SIZING.S]: "h-8 px-2.5 py-1",
                [UI_SIZING.M]: "h-10 px-3.5 py-2"
            } as { [key in UI_SIZING]: string },

            sizeMappingChevron: {
                [UI_SIZING.S]: "p-1",
                [UI_SIZING.M]: "p-2"
            } as { [key in UI_SIZING]: string }
        };
    },
    computed: {
        sizeClasses(): string {
            return this.sizeMapping[this.size];
        },
        chevronSizeClasses(): string {
            return this.sizeMappingChevron[this.size];
        }
    },
    watch: {
        modelValue: {
            immediate: true,
            handler() {
                this.internalOptionValue = this.modelValue;
            }
        },
        internalOptionValue() {
            if (this.isDifferent()) {
                this.$emit("update:modelValue", this.internalOptionValue);
            }
        }
    },
    methods: {
        isDifferent(): boolean {
            const currentModel = (
                Array.isArray(this.modelValue)
                    ? this.modelValue
                    : [this.modelValue]
            ).filter((opt: OptionModel) => !!opt);
            const currentInnerModel = (
                Array.isArray(this.internalOptionValue)
                    ? this.internalOptionValue
                    : [this.internalOptionValue]
            ).filter((opt: OptionModel) => !!opt);

            return (
                currentModel.length !== currentInnerModel.length ||
                !currentModel.every((opt: OptionModel) =>
                    currentInnerModel.find(
                        (opt2: OptionModel) => opt.guid === opt2.guid
                    )
                ) ||
                !currentInnerModel.every((opt: OptionModel) =>
                    currentModel.find(
                        (opt2: OptionModel) => opt.guid === opt2.guid
                    )
                )
            );
        },
        async onInputClick() {
            const popover = this.$refs.popover as typeof EtPopover;
            if (popover.isOpen()) {
                popover.hide();
                this.internalFilterValue = "";
                this.hasInputFocus = false;
                return;
            }
            this.hasInputFocus = true;
            popover.open();
            this.$emit("focus");
            await this.$nextTick();
            (this.$refs.input as typeof EtInput).focus();
        },
        onEscape() {
            (this.$refs.popover as typeof EtPopover).hide();
            this.onInputBlur();
        },
        onOptionToggle() {
            (this.$refs.input as typeof EtInput).focus();
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
            this.$emit("blur");
        },
        onInputClear() {
            this.internalFilterValue = "";
        },
        deSelectOption(option: OptionModel) {
            (this.$refs.select as typeof EtSelect).deSelectOption(option);
        }
    },
    emits: {
        focus: () => true,
        blur: () => true,
        "update:modelValue": (
            data: OptionModel | OptionModel[] | undefined
        ): boolean => true
    }
});
</script>
