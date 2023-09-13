<template>
    <div class="w-3/5">
        <EtPopover ref="popover" manual fitToggle>
            <template #toggle>
                <EtInputGroup>
                    <EtInput
                        ref="input"
                        :modelValue="inputValue"
                        @change="setValuesFromSearch"
                        @enter="() => handleOnInputEnter()"
                        @focus="() => onInputFocus()"
                        @blur="() => onInputBlur()"
                        @keyup.down="() => selectFilterDown()"
                        @keyup.up="() => selectFilterUp()"
                        :name="name"
                        :autocomplete="false"
                        :disabled="disabled"
                        :readonly="readonly"
                        :required="required"
                        :size="size"
                        :error="error"
                        :warning="warning"
                        :success="success"
                        clearButton
                        :placeholder="placeholder || 'Search'"
                    >
                        <template #preIcon>
                            <EtSearchIcon></EtSearchIcon>
                        </template>
                        <template #postIcon>
                            <EtIconSliders
                                class="cursor-pointer"
                                @click="() => toggleFilters()"
                            ></EtIconSliders>
                        </template>
                    </EtInput>
                </EtInputGroup>
            </template>

            <EtBox
                ref="filterBox"
                :tabindex="-1"
                v-if="popoverState === 'FILTERS' && $slots.default"
                @blur="() => closeFilters()"
                @keyup.esc="() => closeFilters()"
            >
                <slot
                    :values="mappedValues"
                    :setValue="setValueFromInput"
                ></slot>

                <EtButtonDefault
                    class="fa-pull-left mt-4"
                    @click="() => closeFilters()"
                >
                    Close
                </EtButtonDefault>
                <EtButtonSuccess
                    class="fa-pull-right mt-4 w-40"
                    @click="() => onFilterSearchClick()"
                >
                    Search
                </EtButtonSuccess>
                <div class="clear-both"></div>
            </EtBox>

            <EtBox
                v-if="
                    popoverState === 'SUGGESTIONS' &&
                    selectableFilterOptions.length > 0
                "
            >
                <small>Available Filters</small>
                <ul>
                    <li
                        class="hover:bg-default-extra-light px-2 my-0.5 rounded-full cursor-pointer"
                        :class="{
                            'bg-default-extra-light':
                                selectedFilterIndex === index
                        }"
                        v-for="(filterOption, index) in selectableFilterOptions"
                        @click="insertFilter(filterOption)"
                        :key="filterOption.code"
                    >
                        - {{ filterOption.label }}:
                    </li>
                </ul>
            </EtBox>
        </EtPopover>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import EtInput, { commonInputProps } from "../../etForm/EtInput.vue";
import EtInputGroup from "../../etForm/EtInputGroup.vue";
import EtInputGroupAddon from "../../etForm/EtInputGroupAddon.vue";
import EtSearchIcon from "../../etIcon/EtIconSearch.vue";
import EtIconSliders from "../../etIcon/EtIconSliders.vue";
import EtButtonSuccess from "../../etButton/EtButtonSuccess.vue";
import EtButtonDefault from "../../etButton/EtButtonDefault.vue";

import EtBox from "../../EtBox.vue";
import EtPopover from "../../EtPopover.vue";

import { UI_SIZING } from "../../../enums";
import { wait } from "../../../helpers/async";

type iFilterValueValue = string | boolean | null | undefined | Array<unknown>;

interface iFilterValue {
    name: string;
    value: iFilterValueValue;
}

interface IFilterOption {
    code: string;
    label: string;
}

export default defineComponent({
    components: {
        EtInput,
        EtInputGroup,
        EtInputGroupAddon,
        EtSearchIcon,
        EtIconSliders,
        EtPopover,
        EtBox,
        EtButtonSuccess,
        EtButtonDefault
    },
    props: {
        ...commonInputProps,
        mainFilterName: {
            required: false,
            type: String,
            default: null
        },
        filterOptions: {
            required: false,
            type: Array<IFilterOption>,
            default: null
        },
        size: {
            required: false,
            type: String as PropType<UI_SIZING>,
            default: UI_SIZING.L
        }
    },
    data() {
        return {
            UI_SIZING,
            currentFocusElement: null,
            filterPopoverOpen: false,
            values: [] as iFilterValue[],

            processingInput: false,
            keepPopoverOpen: false,

            selectedFilterIndex: null as number | null,

            popoverState: null as "FILTERS" | "SUGGESTIONS" | null
        };
    },
    computed: {
        mappedValues() {
            const map: { [key: string]: iFilterValueValue } = {};
            (this.values || []).forEach((val: iFilterValue) => {
                map[val.name] = val.value;
            });
            return map;
        },
        inputValue() {
            return (this.values || [])
                .map((value: iFilterValue) => {
                    // TODO fix display value for different value types
                    let renderValue = value.value;
                    if (typeof renderValue === "string") {
                        const multiword =
                            (renderValue || "").split(" ").length > 1;
                        if (multiword) {
                            renderValue = `(${renderValue})`;
                        }
                    }

                    return `${value.name}:${renderValue}`;
                })
                .join(" ");
        },
        selectableFilterOptions() {
            return (this.filterOptions || []).filter(
                (option: IFilterOption) => {
                    return !Object.keys(this.mappedValues).includes(
                        (option.code || "").toLowerCase()
                    );
                }
            );
        }
    },
    methods: {
        async setValuesFromSearch(
            values: string | number | null
        ): Promise<void> {
            if (this.processingInput) {
                return;
            }

            this.values = [];
            await (this.$refs.input as any)?.clear?.();

            if (!values) {
                return;
            }

            this.processingInput = true;

            if (typeof values === "number") {
                values = String(values);
            }

            // const regex = /(\w+:\([\w\s]+\)|\w+:\w+)/g;
            // const valueFields = values.match(regex);

            const valueFields = values
                .split(/(\w+:\([\w\s]+\)|\w+:\w+)/g)
                .filter(Boolean)
                .map((s) => s.trim());

            let newValues: iFilterValue[] = [];

            (valueFields || []).forEach((valueField) => {
                let [name, value] = valueField.split(":");

                if (!value && this.mainFilterName) {
                    value = name;
                    name = this.mainFilterName;
                }

                name = name.toLowerCase();

                if (!value) {
                    return;
                }

                const regex = /\(([^)]+)\)/;

                const match = value.match(regex);
                if (match) {
                    value = match[1];
                }

                newValues = this.makeNewValues(name, value, newValues);
            });

            this.values = newValues;
            await wait(250);
            this.processingInput = false;
        },
        makeNewValues(
            name: string,
            value: iFilterValueValue,
            currentValues?: iFilterValue[]
        ): iFilterValue[] {
            // Be specific here, as we allow for value to be false
            if (
                value === undefined ||
                value === null ||
                (Array.isArray(value) && value.length <= 0)
            ) {
                this.removeValue(name);
                return this.values;
            }

            const newValues = [] as iFilterValue[];
            let found = false;
            (currentValues || this.values || []).forEach((val) => {
                const _name = val.name;
                if (name !== _name || found) {
                    newValues.push(val);
                    return;
                }

                newValues.push({ name, value });
                found = true;
            });

            if (!found) {
                newValues.push({ name, value });
            }

            return newValues;
        },
        setValueFromInput(name: string, value: iFilterValueValue): void {
            this.values = this.makeNewValues(name, value);
        },
        removeValue(name: string): void {
            this.values = (this.values || []).filter(
                (val) => val.name !== name
            );
        },
        closeFilters() {
            this.hidePopover();
        },
        async openFilters() {
            this.keepPopoverOpen = true;
            this.popoverState = "FILTERS";
            this.openPopover();
            await wait(150);
            const boxComponent = this.$refs.filterBox as any;
            if (boxComponent) {
                const boxElement = boxComponent.$el;
                const childInputs = boxElement.querySelectorAll("input");
                childInputs.length > 0 && childInputs[0].focus();
            }
            this.keepPopoverOpen = false;
        },
        toggleFilters() {
            const popover = this.$refs.popover as any;
            popover.isOpen() && this.popoverState === "FILTERS"
                ? this.closeFilters()
                : this.openFilters();
        },
        openPopover() {
            (this.$refs.popover as any).open();
        },
        async hidePopover() {
            if (this.keepPopoverOpen) {
                return;
            }

            await wait(150);

            if (this.keepPopoverOpen) {
                return;
            }

            (this.$refs.popover as any).hide();
        },
        onFilterSearchClick() {
            this.emitFilters();
            this.closeFilters();
        },
        handleOnInputEnter() {
            if (this.selectedFilterIndex !== null) {
                const filterOption =
                    this.selectableFilterOptions[this.selectedFilterIndex];
                filterOption && this.insertFilter(filterOption);
                this.selectedFilterIndex = null;
            } else {
                this.emitFilters();
                this.hidePopover();
            }
        },
        onInputFocus() {
            this.popoverState = "SUGGESTIONS";
            this.openPopover();
        },
        onInputBlur() {
            this.hidePopover();
        },
        async insertFilter(filterOption: IFilterOption) {
            this.processingInput = true;
            this.keepPopoverOpen = true;
            const newValue = `${this.inputValue} ${(
                filterOption.code || ""
            ).toLowerCase()}:()`;

            const inputComponent = this.$refs.input as any;
            inputComponent.setValue(newValue);
            inputComponent.focus();

            await this.$nextTick();

            inputComponent.setSelectionRange(
                newValue.length - 1,
                newValue.length - 1
            );

            await wait(150);
            this.processingInput = false;
            this.keepPopoverOpen = false;
        },
        selectFilterDown() {
            let newSelectedFilterIndex =
                this.selectedFilterIndex === null
                    ? 0
                    : this.selectedFilterIndex + 1;

            const selectableFilterOptionsCount =
                this.selectableFilterOptions.length;
            if (newSelectedFilterIndex >= selectableFilterOptionsCount) {
                newSelectedFilterIndex = 0;
            }

            this.selectedFilterIndex = newSelectedFilterIndex;
        },
        selectFilterUp() {
            const selectableFilterOptionsCount =
                this.selectableFilterOptions.length;

            let newSelectedFilterIndex =
                this.selectedFilterIndex === null
                    ? selectableFilterOptionsCount - 1
                    : this.selectedFilterIndex - 1;

            if (newSelectedFilterIndex < 0) {
                newSelectedFilterIndex = selectableFilterOptionsCount - 1;
            }

            this.selectedFilterIndex = newSelectedFilterIndex;
        },
        async emitFilters() {
            await wait(150);
            this.$emit("filters", this.mappedValues);
        }
    }
});
</script>
