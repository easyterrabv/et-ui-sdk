<template>
    <EtDynamicSelect
        :data-getter="dataGetter"
        :placeholder="placeholder"
        :on-option-select="handleOptionSelect"
        :disabled="disabled"
        :multiple="multiple"
        :selected-option="selectedOption"
    >
        <template #toggle>
            <div
                class="et-sdk-input-like"
                :class="{
                    'et-sdk-input-like__xs': size === UI_SIZING.XS,
                    'et-sdk-input-like__s': size === UI_SIZING.S,
                    'et-sdk-input-like__m': size === UI_SIZING.M,
                    'et-sdk-input-like__l': size === UI_SIZING.L
                }"
            >
                <EtBadgeDefault v-for="option in internalSelectedOption">
                    {{ option.label }}
                </EtBadgeDefault>
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
        setOptions(props.selectedOption);
    },
    { immediate: true }
);

function setOptions(value: OptionModel | OptionModel[] | null) {
    if (!value) {
        internalSelectedOption.value = [];
        return;
    }

    const arValue = Array.isArray(value) ? value : [value];
    internalSelectedOption.value = arValue.filter((val) => !!val);
}

function handleOptionSelect(value: OptionModel | OptionModel[] | null) {
    props.onOptionSelect?.(value);
    setOptions(value);
    emit("change", value);
}

const emit = defineEmits<{
    (e: "change", value: OptionModel | OptionModel[] | null): void;
}>();
</script>
