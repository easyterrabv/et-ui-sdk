<template>
    <EtButtonGroup>
        <EtButton
            v-for="option in options"
            :key="option.guid"
            :disabled="disabled"
            :readonly="readonly"
            :size="size"
            @click="toggleOption(option)"
            :type="
                isSelected(option)
                    ? option.type || UI_TYPES.PRIMARY
                    : UI_TYPES.DEFAULT
            "
        >
            {{ option.label }}
        </EtButton>
    </EtButtonGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { OptionModel } from "../../models/Option";
import { commonInputProps } from "./EtInput.vue";

import EtButtonGroup from "../etButton/EtButtonGroup.vue";
import EtButton from "../etButton/EtButton.vue";
import { UI_TYPES } from "../../enums";

export default defineComponent({
    components: {
        EtButtonGroup,
        EtButton
    },
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
    data() {
        return {
            UI_TYPES,
            internalOptionValue: undefined as
                | OptionModel
                | OptionModel[]
                | undefined
        };
    },
    watch: {
        modelValue: {
            immediate: true,
            handler() {
                const modelIsArray = Array.isArray(this.modelValue);

                if (!this.modelValue) {
                    this.internalOptionValue = [];
                }

                if (this.multiple && !modelIsArray) {
                    this.internalOptionValue = [this.modelValue];
                } else if (
                    !this.multiple &&
                    modelIsArray &&
                    this.modelValue.length > 0
                ) {
                    this.internalOptionValue = [this.modelValue[0]];
                } else {
                    this.internalOptionValue = this.modelValue;
                }
            }
        },
        internalOptionValue() {
            let emitValue = this.internalOptionValue || null;
            if (
                !this.multiple &&
                Array.isArray(emitValue) &&
                emitValue.length > 0
            ) {
                emitValue = emitValue[0];
            }
            this.$emit("update:modelValue", emitValue);
        }
    },
    methods: {
        isSelected(option: OptionModel) {
            if (this.internalOptionValue === option) {
                return true;
            }

            let valuesArray = this.internalOptionValue;
            if (!Array.isArray(valuesArray)) {
                valuesArray = [valuesArray];
            }

            return valuesArray.find(
                (value: OptionModel) => value.guid === option.guid
            );
        },
        toggleOption(option: OptionModel) {
            if (this.isSelected(option)) {
                this.deselectOption(option);
            } else {
                this.selectOption(option);
            }
        },
        deselectOption(option: OptionModel) {
            if (!this.isSelected(option)) {
                return;
            }

            if (!this.multiple) {
                this.internalOptionValue = [];
            } else {
                this.internalOptionValue = this.internalOptionValue.filter(
                    (opt) => opt.guid !== option.guid
                );
            }
        },
        selectOption(option: OptionModel) {
            if (this.isSelected(option)) {
                return;
            }

            if (!this.multiple) {
                this.internalOptionValue = [option];
            } else {
                this.internalOptionValue = [
                    ...this.internalOptionValue,
                    option
                ];
            }
        }
    }
});
</script>
