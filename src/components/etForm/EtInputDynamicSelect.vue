<template>
    <EtDynamicSelect
        :data-getter="dataGetter"
        :placeholder="placeholder"
        :on-option-select="handleOptionSelect"
        :disabled="disabled"
        :multiple="multiple"
        :selected-option="internalSelectedOption"
    >
        <template #toggle>
            <div
                class="et-sdk-input-dynamic__input et-sdk-input-like hide-scrollbar"
                :class="{
                    'et-sdk-input-like__xs': size === UI_SIZING.XS,
                    'et-sdk-input-like__s': size === UI_SIZING.S,
                    'et-sdk-input-like__m': size === UI_SIZING.M,
                    'et-sdk-input-like__l': size === UI_SIZING.L
                }"
            >
                <div class="et-sdk-input-dynamic__selected-options">
                    <EtBadgeDefault
                        class="et-sdk-input-dynamic__selected-option"
                        v-for="option in internalSelectedOption"
                    >
                        {{ option.label }}
                        <EtIconTimes
                            v-if="multiple"
                            @click.stop="clearSingleOption(option)"
                            class="et-sdk-input-dynamic__clear-button"
                        />
                    </EtBadgeDefault>
                </div>
                <EtIconTimes
                    v-if="internalSelectedOption.length > 0"
                    @click.stop="clearSelectedOptions"
                    class="et-sdk-input-dynamic__clear-button"
                />
            </div>
        </template>
    </EtDynamicSelect>
</template>

<script setup lang="ts">
import { type PropType, ref, watch } from "vue";
import { OptionModel } from "../../models/Option";
import EtDynamicSelect from "../etForm/EtDynamicSelect.vue";
import { UI_SIZING } from "../../helpers/enums";
import EtBadgeDefault from "../etBadge/EtBadgeDefault.vue";

import EtIconTimes from "../etIcon/EtIconTimes.vue";

const props = defineProps({
    size: {
        required: false,
        type: String,
        default: UI_SIZING.M
    },
    dataGetter: {
        type: Function as PropType<
            (searchInput: string) => Promise<OptionModel[]> | OptionModel[]
        >,
        required: true
    },
    placeholder: {
        type: String,
        default: "Filter Options"
    },
    onOptionSelect: {
        type: Function as PropType<
            (selectedOption: OptionModel | OptionModel[] | null) => void
        >,
        required: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    multiple: {
        type: Boolean,
        default: false
    },
    selectedOption: {
        type: [Object, Array] as PropType<OptionModel | OptionModel[]>,
        default: null
    }
});

const internalSelectedOption = ref<OptionModel[]>([]);

watch(
    () => props.selectedOption,
    () => {
        setSelectedOptions(props.selectedOption);
    },
    { immediate: true }
);

function clearSingleOption(option: OptionModel) {
    if (!Array.isArray(internalSelectedOption.value)) {
        return;
    }

    const isSelected =
        internalSelectedOption.value.findIndex(
            (opt) => opt.value === option.value
        ) > -1;

    if (!isSelected) {
        return;
    }

    const newSelectedOptions = internalSelectedOption.value.filter(
        (opt) => opt.value !== option.value
    );
    handleOptionSelect(newSelectedOptions);
}

function setSelectedOptions(value: OptionModel | OptionModel[] | null) {
    if (!value) {
        internalSelectedOption.value = [];
        return;
    }

    const arValue = Array.isArray(value) ? value : [value];
    internalSelectedOption.value = arValue.filter((val) => !!val);
}

function clearSelectedOptions() {
    handleOptionSelect(props.multiple ? [] : null);
}

function handleOptionSelect(value: OptionModel | OptionModel[] | null) {
    props.onOptionSelect?.(value);
    setSelectedOptions(value);
    emit("change", value);
}

const emit = defineEmits<{
    (e: "change", value: OptionModel | OptionModel[] | null): void;
}>();
</script>

<style>
.et-sdk-input-dynamic__input {
    display: flex;
    align-items: center;
}

.et-sdk-input-dynamic__selected-options {
    flex-grow: 1;
    display: flex;
    gap: 5px;
    flex-wrap: nowrap;
    flex-basis: auto;
    overflow: auto;
}

.et-sdk-input-dynamic__selected-option {
    min-width: max-content;
}

.et-sdk-input-dynamic__clear-button {
    color: var(--et-sdk-dark-300);
    white-space: nowrap;
    cursor: pointer;
}
</style>
