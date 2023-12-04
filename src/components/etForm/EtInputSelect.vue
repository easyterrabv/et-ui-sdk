<template>
    <div
        class="et-sdk-input-select"
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
                        :class="{
                            'et-sdk-input-like__xs': size === UI_SIZING.XS,
                            'et-sdk-input-like__s': size === UI_SIZING.S,
                            'et-sdk-input-like__m': size === UI_SIZING.M,
                            'et-sdk-input-like__l': size === UI_SIZING.L
                        }"
                        class="et-sdk-input-like"
                    >
                        <div
                            class="et-sdk-input-like--content"
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
                                    !multiple &&
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
                                    class="et-sdk-input-select--option-badge"
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
                            :class="{
                                'et-sdk-input-like--toggle__xs':
                                    size === UI_SIZING.XS,
                                'et-sdk-input-like--toggle__s':
                                    size === UI_SIZING.S,
                                'et-sdk-input-like--toggle__m':
                                    size === UI_SIZING.M,
                                'et-sdk-input-like--toggle__l':
                                    size === UI_SIZING.L
                            }"
                            class="et-sdk-input-like--toggle"
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
import { defineComponent, type PropType } from "vue";

import EtPopover from "../EtPopover.vue";
import EtInput from "./EtInput.vue";
import EtBadgeDefault from "../etBadge/EtBadgeDefault.vue";
import EtSelect from "../etSelect/EtSelect.vue";
import EtIconTimes from "../etIcon/EtIconTimes.vue";
import EtIconChevronDown from "../etIcon/EtIconChevronDown.vue";

import { wait } from "../../helpers/async";
import { OptionModel } from "../../models/Option";

import { commonInputProps } from "./EtInput.vue";
import { UI_SIZING } from "../../helpers/enums";

export default defineComponent({
    props: {
        options: {
            type: Array as PropType<OptionModel[]>,
            required: true
        },
        modelValue: {
            type: Object as PropType<OptionModel | OptionModel[] | null>,
            default: null
        },
        multiple: {
            type: Boolean,
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
            UI_SIZING,
            internalFilterValue: "",
            internalOptionValue: undefined as
                | OptionModel
                | OptionModel[]
                | undefined
                | null,

            hasInputFocus: false as Boolean,
            justToggledOption: false
        };
    },
    watch: {
        modelValue: {
            immediate: true,
            handler() {
                this.internalOptionValue = this.modelValue;
            }
        },
        internalOptionValue: {
            deep: true,
            handler() {
                if (this.isDifferent()) {
                    this.$emit("update:modelValue", this.internalOptionValue);
                }
            }
        }
    },
    methods: {
        isDifferent(): boolean {
            let currentModel: OptionModel[] = [];
            if (Array.isArray(this.modelValue)) {
                currentModel = this.modelValue;
            } else if (!Array.isArray(this.modelValue) && !!this.modelValue) {
                currentModel = [this.modelValue];
            }
            const currentModelFiltered: OptionModel[] = currentModel.filter(
                (opt) => !!opt
            );

            let currentInnerModel: OptionModel[] = [];
            if (Array.isArray(this.internalOptionValue)) {
                currentInnerModel = this.internalOptionValue;
            } else if (
                !Array.isArray(this.internalOptionValue) &&
                !!this.internalOptionValue
            ) {
                currentInnerModel = [this.internalOptionValue];
            }
            const currentInnerModelFiltered = currentInnerModel.filter(
                (opt) => !!opt
            );

            const sameLength =
                currentModelFiltered.length ===
                currentInnerModelFiltered.length;

            const everyModelInInner = currentModelFiltered.every(
                (opt: OptionModel) => {
                    return !!currentInnerModelFiltered.find(
                        (opt2: OptionModel) => {
                            return opt.guid === opt2.guid;
                        }
                    );
                }
            );

            const everyInnerInModel = currentInnerModelFiltered.every(
                (opt: OptionModel) =>
                    currentModelFiltered.find(
                        (opt2: OptionModel) => opt.guid === opt2.guid
                    )
            );

            return !sameLength || !everyModelInInner || !everyInnerInModel;
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
            data: OptionModel | OptionModel[] | undefined | null
        ): boolean => true
    }
});
</script>

<style>
.et-sdk-input-select {
    display: inline-block;
    width: 320px;
}

.et-sdk-input-select--option-badge {
    margin-right: 8px;
}

.et-sdk-input-like--toggle {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    cursor: pointer;
    color: var(--et-sdk-dark-300);
    background-color: var(--et-sdk-light-0);
    border-radius: 8px;
    box-shadow: var(--et-sdk-shadow-normal);
}

.et-sdk-input-like--toggle:hover {
    background-color: var(--et-sdk-dark-50);
}

.et-sdk-input-like--toggle__xs {
    padding: 2px;
}

.et-sdk-input-like--toggle__s {
    padding: 4px;
}

.et-sdk-input-like--toggle__m {
    padding: 8px;
}

.et-sdk-input-like--toggle__l {
    padding: 12px;
}
</style>
