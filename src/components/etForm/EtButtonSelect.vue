<template>
    <EtButtonGroup>
        <EtButton
            v-for="option in options"
            :key="option.guid"
            :disabled="disabled"
            :readonly="readonly"
            :size="size"
            style="font-size: inherit"
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
            internalOptionValue: [] as OptionModel | OptionModel[]
        };
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
        isSelected(option: OptionModel) {
            if (!option) {
                return false;
            }

            if (this.internalOptionValue === option) {
                return true;
            }

            let valuesArray = this.internalOptionValue;
            if (!Array.isArray(valuesArray)) {
                valuesArray = [valuesArray];
            }

            return valuesArray
                .filter((opt: OptionModel) => !!opt)
                .find((value: OptionModel) => value.guid === option.guid);
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
                ].filter((opt: OptionModel) => !!opt);
            }
        }
    }
});
</script>
