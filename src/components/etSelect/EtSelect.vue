<template>
    <div class="et-select inline-block shadow bg-white py-2 rounded">
        <div
            class="relative cursor-pointer py-1 px-3 text-text"
            :class="{
                'bg-primary-extra-light': isSelected(option) && !multiple,
                'hover:bg-default-extra-light': !multiple,
                'hover:bg-primary-extra-light': multiple
            }"
            @mouseup.left.stop="(e) => selectDebounce.debounce(option)"
            v-for="option in sortedOptions"
            :key="option.guid"
        >
            <EtCheckbox
                :checked="isSelected(option)"
                readonly
                v-if="multiple"
            ></EtCheckbox>
            {{ option.label }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import EtCheckbox from "src/components/etForm/EtCheckbox.vue";
import { OptionModel } from "../../models/Option";
import { Debounce } from "../../helpers/debounce";
import { needleFixer } from "../../helpers/misc";

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
            type: Array<OptionModel>,
            required: true
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        },
        modelValue: {
            type: [OptionModel, Array<OptionModel>],
            required: false,
            default: null
        }
    },
    data() {
        return {
            internalSelected: null as OptionModel | OptionModel[] | null,
            selectDebounce: new Debounce(this.select, 50)
        };
    },
    watch: {
        internalSelected: {
            immediate: true,
            handler(value) {
                this.$emit("update:modelValue", this.internalSelected);
            }
        },
        modelValue: {
            immediate: true,
            handler(modelValue) {
                this.internalData = modelValue;
            }
        }
    },
    computed: {
        filteredOptions() {
            const options = this.options || [];
            const filteredOptions = [];

            const fixedValue = needleFixer(this.filter);

            (options || []).forEach((option: OptionModel, index) => {
                if (!option) {
                    return;
                }

                if (!fixedValue) {
                    // To keep this in order of supplied array order.
                    option.score = -option.defaultSortOrder;
                    filteredOptions.push(option);
                    return;
                }

                option.calculateAndSetScore(this.filter);

                if (option.score > 0) {
                    filteredOptions.push(option);
                }
            });

            return filteredOptions;
        },
        sortedOptions() {
            return (this.filteredOptions || []).sort(
                (a: OptionModel, b: OptionModel) => {
                    const scoreA = a.score || 0;
                    const scoreB = b.score || 0;
                    return scoreA < scoreB ? 1 : scoreA > scoreB ? -1 : 0;
                }
            );
        }
    },
    methods: {
        isSelected(option: OptionModel) {
            if (!this.multiple) {
                return this.internalSelected?.guid === option.guid;
            }

            return (
                (this.internalSelected || []).findIndex(
                    (opt) => opt.guid === option.guid
                ) > -1
            );
        },
        select(option: OptionModel) {
            if (!this.multiple) {
                this.internalSelected = option;
                return;
            }

            if (!Array.isArray(this.internalSelected)) {
                const currentValue = this.internalSelected;
                this.internalSelected = [];
                if (currentValue instanceof OptionModel) {
                    this.internalSelected.push(currentValue);
                }
            }

            const isAlreadySelected =
                this.internalSelected.findIndex(
                    (opt) => opt.guid === option.guid
                ) > -1;
            if (isAlreadySelected) {
                this.internalSelected = this.internalSelected.filter(
                    (opt) => opt.guid !== option.guid
                );
            } else {
                this.internalSelected.push(option);
            }
        }
    },
    emits: {
        // will trigger and usually only update the v-model value
        "update:modelValue": (
            modelValue: OptionModel | OptionModel[] | null
        ): boolean => {
            return (
                modelValue instanceof OptionModel ||
                Array.isArray(modelValue) ||
                modelValue === null
            );
        }
    }
});
</script>
