<template>
    <div class="et-sdk-select hide-scrollbar">
        <div
            class="et-sdk-select--option"
            :class="{
                'et-sdk-select--option__selected':
                    !multiple && isSelected(option)
            }"
            v-for="option in filteredOptions"
            @click.left.stop="(e) => selectDebounce.debounce(option)"
            :key="option.guid"
        >
            <div v-if="multiple" class="et-sdk-select--option--checkbox">
                <EtCheckbox :checked="isSelected(option)" readonly></EtCheckbox>
            </div>
            <div class="et-sdk-select--option--content">
                {{ option.label }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import EtCheckbox from "../etForm/EtCheckbox.vue";
import { OptionModel } from "../../models/Option";
import { Debounce } from "../../helpers/debounce";
import { areArraysWithObjectsEqual, makeArray } from "../../helpers/array";
import { filterOnBestMatch } from "../../helpers/search";

export default defineComponent({
    components: {
        EtCheckbox
    },
    model: {
        // backwards compatibility with vue2.x
        prop: "modelValue",
        event: "update:modelValue"
    },
    props: {
        filter: {
            type: String,
            required: false,
            default: null
        },
        options: {
            type: Array as PropType<OptionModel[]>,
            required: true
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        modelValue: {
            type: Object as PropType<OptionModel | OptionModel[] | null>,
            required: false,
            default: null
        }
    },
    data() {
        return {
            internalSelected: null as OptionModel | OptionModel[] | null,
            selectDebounce: new Debounce(
                (option: OptionModel) => this.select(option),
                50
            )
        };
    },
    watch: {
        internalSelected: {
            immediate: true,
            handler(value) {
                if (this.isDifferent()) {
                    this.$emit("update:modelValue", this.internalSelected);
                }
            }
        },
        modelValue: {
            immediate: true,
            handler(modelValue) {
                // Have to do it this way.
                // Ran into an issue that the value was being set by reference
                // So that when internalSelected was updated, the modelValue in
                // the parent component would instantly update too..
                // (when not using @update:modelValue or v-model that is)
                if (this.multiple) {
                    if (Array.isArray(modelValue)) {
                        this.internalSelected = modelValue.map((val) => val);
                    } else {
                        this.internalSelected = [];
                    }
                } else {
                    this.internalSelected = modelValue;
                }
            }
        }
    },
    computed: {
        filteredOptions() {
            return filterOnBestMatch(this.filter, this.options, 0);
        }
    },
    methods: {
        isDifferent(): boolean {
            const currentArray = makeArray(this.modelValue).filter(
                (opt) => !!opt
            );
            const innerArray = makeArray(this.internalSelected).filter(
                (opt) => !!opt
            );
            return !areArraysWithObjectsEqual("guid", currentArray, innerArray);
        },
        isSelected(option: OptionModel) {
            if (!this.multiple) {
                return (
                    (this.internalSelected as OptionModel)?.guid === option.guid
                );
            }

            return (
                (this.internalSelected || []).findIndex(
                    (opt: OptionModel) => opt.guid === option.guid
                ) > -1
            );
        },
        fixInterSelectedIntegrity() {
            if (!this.multiple && Array.isArray(this.internalSelected)) {
                const firstItem =
                    this.internalSelected.length > 0
                        ? this.internalSelected[0]
                        : null;

                if (firstItem instanceof OptionModel) {
                    this.internalSelected = firstItem || null;
                } else {
                    this.internalSelected = null;
                }
            }

            if (this.multiple && !Array.isArray(this.internalSelected)) {
                const currentValue = this.internalSelected;
                this.internalSelected = [];
                if (currentValue instanceof OptionModel) {
                    this.internalSelected.push(currentValue);
                }
            }
        },
        select(option: OptionModel) {
            this.fixInterSelectedIntegrity();

            if (!this.multiple) {
                this.internalSelected = option;
                return;
            }

            if (this.multiple && !this.internalSelected) {
                this.internalSelected = [];
            }

            const isAlreadySelected =
                this.internalSelected?.findIndex(
                    (opt: OptionModel) => opt.guid === option.guid
                ) > -1;

            if (isAlreadySelected) {
                this.internalSelected = this.internalSelected?.filter(
                    (opt: OptionModel) => opt.guid !== option.guid
                );
            } else if (Array.isArray(this.internalSelected)) {
                this.internalSelected = [
                    ...(this.internalSelected || []),
                    option
                ];
            } else {
                this.internalSelected = option;
            }

            this.$emit("optionToggled", option);
        },
        deSelectOption(option: OptionModel) {
            this.fixInterSelectedIntegrity();

            if (
                !this.multiple &&
                this.internalSelected instanceof OptionModel
            ) {
                if (this.internalSelected.guid === option.guid) {
                    this.internalSelected = null;
                }
                return;
            }

            if (!Array.isArray(this.internalSelected)) {
                this.internalSelected = null;
                return;
            }

            const isSelected =
                this.internalSelected?.findIndex(
                    (opt) => opt.guid === option.guid
                ) > -1;

            if (isSelected) {
                this.internalSelected = this.internalSelected.filter(
                    (opt) => opt.guid !== option.guid
                );
            }
        }
    },
    emits: {
        // will trigger and usually only update the v-model value
        "update:modelValue": (
            modelValue: OptionModel | OptionModel[] | null
        ): boolean => true,
        optionToggled: (opt: OptionModel): boolean => true
    }
});
</script>

<style>
.et-sdk-select {
    display: inline-block;
    box-shadow: var(--et-sdk-shadow-normal);
    background-color: var(--et-sdk-light-0);
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 4px;
    width: 100%;

    max-height: 350px;
    overflow-y: auto;
}

.et-sdk-select--option {
    cursor: pointer;
    padding: 4px 12px;
    display: flex;
    flex-direction: row;
    font-weight: var(--et-sdk-font-weight-normal);
}

.et-sdk-select--option:hover {
    background-color: var(--et-sdk-blue-300);
}

.et-sdk-select--option__selected {
    background-color: var(--et-sdk-blue-300);
}

.et-sdk-select--option--checkbox {
    padding-right: 4px;
    padding-top: 1px;
    margin-top: 4px;
}

.et-sdk-select--option--content {
    flex-grow: 1;
}
</style>
