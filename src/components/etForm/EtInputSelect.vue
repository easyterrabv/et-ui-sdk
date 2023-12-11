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
                                <EtBadge
                                    class="et-sdk-input-select--option-badge"
                                    v-for="option in internalOptionValue"
                                    :key="option.guid"
                                    :type="option.type || UI_TYPES.DEFAULT"
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
                                </EtBadge>
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
import EtBadge from "../etBadge/EtBadge.vue";
import EtSelect from "../etSelect/EtSelect.vue";
import EtIconTimes from "../etIcon/EtIconTimes.vue";
import EtIconChevronDown from "../etIcon/EtIconChevronDown.vue";

import { wait } from "../../helpers/async";
import { OptionModel } from "../../models/Option";

import { commonInputProps } from "./EtInput.vue";
import { UI_SIZING, UI_TYPES } from "../../helpers/enums";
import { areArraysWithObjectsEqual, makeArray } from "../../helpers/array";

export default defineComponent({
    computed: {
        UI_TYPES() {
            return UI_TYPES;
        }
    },
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
        EtBadge
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
            const currentArray = makeArray(this.modelValue).filter(
                (opt) => !!opt
            );
            const innerArray = makeArray(this.internalOptionValue).filter(
                (opt) => !!opt
            );
            return !areArraysWithObjectsEqual("guid", currentArray, innerArray);
        },
        async onInputClick() {
            const popover = this.$refs.popover as typeof EtPopover;
            if (popover.isOpen()) {
                this.hide();
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
        },
        hide() {
            const popover = this.$refs.popover as typeof EtPopover;
            popover.hide();
            this.internalFilterValue = "";
            this.hasInputFocus = false;
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
    display: block;
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
