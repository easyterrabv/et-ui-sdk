<template>
    <div class="et-sdk-input-smart-filter">
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
                        @clear="() => handleClear()"
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
                        <template #postIcon v-if="$slots.default">
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
                    class="et-sdk-input-smart-filter--filter-box--close"
                    @click="() => closeFilters()"
                >
                    Close
                </EtButtonDefault>
                <EtButtonSuccess
                    class="et-sdk-input-smart-filter--filter-box--search"
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
                        class="et-sdk-input-smart-filter--available-filters--item"
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

import { UI_SIZING } from "../../../helpers/enums";
import { wait } from "../../../helpers/async";
import { Debounce } from "../../../helpers/debounce";

export type iFilterValueValue =
    | string
    | boolean
    | null
    | undefined
    | Array<unknown>;

export interface iFilterValue {
    name: string;
    value: iFilterValueValue;
}

export interface IFilterOption {
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
        filterOptions: {
            required: false,
            type: Array<IFilterOption>,
            default: null
        },
        name: {
            // Overwrites name from commonInputProps
            type: String,
            required: false
        },
        saveFilters: {
            required: false,
            type: Boolean,
            default: false
        },
        size: {
            required: false,
            type: String as PropType<UI_SIZING>,
            default: UI_SIZING.L
        }
    },
    data() {
        const self = this;
        return {
            UI_SIZING,
            currentFocusElement: null,
            filterPopoverOpen: false,
            values: [] as iFilterValue[],

            processingInput: false,
            keepPopoverOpen: false,

            selectedFilterIndex: null as number | null,

            popoverState: null as "FILTERS" | "SUGGESTIONS" | null,

            emitFiltersDebounce: new Debounce(() => self.emitFilters(), 100)
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
                        // take value out of braces
                        const match = renderValue.match(/\(([^)]+)\)/);
                        if (match) {
                            renderValue = match[1];
                        }
                        renderValue = `${renderValue}`;
                    }

                    return `${value.name}:(${renderValue})`;
                })
                .join(" ");
        },
        selectableFilterOptions() {
            return this.filterOptions || [];
        },
        canSaveFilters() {
            return this.saveFilters && !!this.name;
        }
    },
    methods: {
        async setValuesFromSearch(
            values: string | number | null
        ): Promise<void> {
            if (this.processingInput) {
                return;
            }

            if (!values) {
                this.values = [];
                await (this.$refs.input as any)?.clear?.();
                return;
            }

            this.processingInput = true;

            if (typeof values === "number") {
                values = String(values);
            }

            const valueFields = values
                .split(/([\w\-]+:\((?:[^\\()]+|\\\\.|\\[()])*?\))|([\w]+)/gm)
                .filter(Boolean)
                .map((s) => s.trim())
                .filter(Boolean);

            let newValues: iFilterValue[] = [];

            (valueFields || []).forEach((valueField) => {
                let [name, value] = valueField.split(":");
                name = name.toLowerCase();

                if (!value) {
                    return;
                }

                // take value out of braces
                const match = value.match(/\(([^)]+)\)/);
                if (match) {
                    value = match[1];
                }

                newValues.push({ name, value } as iFilterValue);
            });

            this.values = newValues;
            await wait(250);
            this.processingInput = false;
        },
        setValueFromInput(name: string, value: iFilterValueValue): void {
            const currentValues: iFilterValue[] = this.values || [];
            const newValues: iFilterValue[] = [];

            let found = false;
            currentValues.forEach((filterValue: iFilterValue) => {
                if (!value) {
                    found = true;
                    return;
                }

                const isCurrentEditingFilter = filterValue.name === name;
                if (isCurrentEditingFilter) {
                    found = true;
                    filterValue.value = value;
                }

                newValues.push(filterValue);
            });

            if (!found) {
                newValues.push({ name, value } as iFilterValue);
            }

            this.values = newValues.filter(
                (filterValue: iFilterValue) => !!filterValue.value
            );
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
            this.emitFiltersDebounce.debounce();
            this.closeFilters();
        },
        handleOnInputEnter() {
            if (this.selectedFilterIndex !== null) {
                const filterOption =
                    this.selectableFilterOptions[this.selectedFilterIndex];
                filterOption && this.insertFilter(filterOption);
                this.selectedFilterIndex = null;
            } else {
                this.emitFiltersDebounce.debounce();
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

            await wait(150);

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
            this.saveFiltersToUrl();
            this.$emit("filters", this.mappedValues);
        },
        async handleClear() {
            this.values = [];
            this.emitFiltersDebounce.debounce();
        },
        saveFiltersToUrl() {
            if (!this.canSaveFilters) {
                return;
            }

            const queryKey = `${this.name}SmartFilter`;
            const currentDataString = this.$route.query[queryKey] || "";

            let newDataString = "";
            if (Object.keys(this.mappedValues).length > 0) {
                newDataString = btoa(JSON.stringify(this.mappedValues));
            }

            if (currentDataString !== newDataString) {
                const query = { ...this.$route.query };
                if (newDataString) {
                    query[queryKey] = newDataString;
                } else if (currentDataString && currentDataString !== "{}") {
                    delete query[queryKey];
                }

                try {
                    this.$router.push({ query });
                } catch (e) {
                    console.error(e);
                }
            }
        },
        loadFiltersFromUrl() {
            if (!this.canSaveFilters) {
                return;
            }

            const queryKey = `${this.name}SmartFilter`;
            const dataString: string = (this.$route.query[queryKey] ||
                "") as string;

            if (!dataString) {
                return;
            }

            const dataObject = JSON.parse(atob(dataString));
            this.values = Object.entries(dataObject || {}).map(
                ([name, value]) => {
                    return {
                        name,
                        value: value as iFilterValueValue
                    };
                }
            );
        }
    },
    mounted() {
        if (this.saveFilters && !this.name) {
            console.warn("Name prop required if saveFilters = true");
        } else {
            this.loadFiltersFromUrl();
        }
    }
});
</script>

<style>
.et-sdk-input-smart-filter {
    width: 60%;
}

.et-sdk-input-smart-filter--filter-box--close {
    float: left;
    margin-top: 4px;
}

.et-sdk-input-smart-filter--filter-box--search {
    float: right;
    margin-top: 4px;
    width: 60px;
}

.et-sdk-input-smart-filter--available-filters--item {
    padding-left: 15px;
    padding-right: 15px;

    margin-top: 2px;
    margin-bottom: 2px;

    border-radius: 99999px;

    cursor: pointer;
}

.et-sdk-input-smart-filter--available-filters--item:hover {
    background-color: var(--et-sdk-light-200);
}
</style>
