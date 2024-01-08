<template>
    <div
        class="et-sdk-select-dynamic"
        @keyup.down="handleKeyDownPressed"
        @keyup.up="handleKeyUpPressed"
    >
        <EtInput
            :placeholder="placeholder"
            theme="grey"
            ref="input"
            class="et-sdk-select-dynamic__search"
            v-model="searchInput"
            @enter="handleInputEnterPressed"
        >
            <template #preIcon>
                <EtIconSearch />
            </template>
        </EtInput>
        <div class="et-sdk-select-dynamic__options hide-scrollbar">
            <template v-if="loading">
                <div class="et-sdk-select-dynamic__loading">
                    <EtIconSpinner pulse />
                    Searching
                </div>
            </template>
            <template v-else-if="options.length > 0">
                <div
                    v-for="(option, index) in options"
                    :key="option.value"
                    @click="(e) => handleOnClick(option)"
                >
                    <div
                        class="et-sdk-select-dynamic__option"
                        :class="{
                            'et-sdk-select-dynamic__option--focused':
                                index === focusedIndex
                        }"
                    >
                        <slot :option="option">
                            {{ (option as OptionModel).label }}
                        </slot>
                    </div>
                </div>
            </template>
            <template v-else-if="options.length <= 0">
                <div class="et-sdk-select-dynamic__empty">No options</div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtInput from "../etForm/EtInput.vue";
import EtIconSearch from "../etIcon/EtIconSearch.vue";
import type { PropType } from "vue";
import { onMounted, ref, watch } from "vue";
import { OptionModel } from "../../models/Option";
import { Debounce } from "../../helpers/debounce";
import EtIconSpinner from "../etIcon/EtIconSpinner.vue";

const props = defineProps({
    dataGetter: {
        type: Function as PropType<
            (searchInput: string) => Promise<OptionModel[]>
        >,
        required: true
    },
    placeholder: {
        type: String,
        default: "Filter Options"
    },
    onOptionSelect: {
        type: Function as PropType<(selectedOption: OptionModel) => void>,
        required: true
    }
});

const input = ref(null);
const focusedIndex = ref(-1);
const loading = ref(false);

const searchInput = ref("");
const resultSearchInput = ref("");

const options = ref<OptionModel[]>([]);
const searchDebounce = new Debounce(handleSearch, 250);
watch(
    () => searchInput.value,
    () => searchDebounce.debounce()
);

async function handleSearch() {
    loading.value = true;
    focusedIndex.value = -1;
    const result = await props.dataGetter(searchInput.value);
    if (Array.isArray(result)) {
        options.value = result;
    }
    loading.value = false;
    resultSearchInput.value = searchInput.value;
}

async function handleInputEnterPressed() {
    if (
        resultSearchInput.value === searchInput.value &&
        focusedIndex.value > -1
    ) {
        handleOptionSelectByIndex(focusedIndex.value);
        return;
    }

    await handleSearch();
}

function handleOptionSelectByIndex(index: number) {
    if (index < 0 || index >= options.value.length) {
        return;
    }

    const option = options.value[index];
    handleOnClick(option);
}

function handleKeyDownPressed() {
    focusedIndex.value += 1;
    if (focusedIndex.value >= options.value.length) {
        focusedIndex.value = 0;
    }
}

function handleKeyUpPressed() {
    focusedIndex.value -= 1;
    if (focusedIndex.value < 0) {
        focusedIndex.value = options.value.length - 1;
    }
}

function handleOnClick(selectedOption: OptionModel) {
    focusedIndex.value = -1;
    props.onOptionSelect?.(selectedOption);
}

function focusInput() {
    focusedIndex.value = -1;
    (input?.value as any).focus?.();
}

defineExpose({
    focusInput
});
</script>

<style>
.et-sdk-select-dynamic {
    width: 320px;
    padding: 12px;
    box-shadow: var(--et-sdk-shadow-normal);
    border-radius: var(--et-sdk-input-border-radius);
    background-color: var(--et-sdk-light-0);
}

.et-sdk-select-dynamic__search {
    margin-bottom: 12px;
}

.et-sdk-select-dynamic__options {
    max-height: 200px;
    overflow-y: auto;
}

.et-sdk-select-dynamic__loading,
.et-sdk-select-dynamic__option,
.et-sdk-select-dynamic__empty {
    line-height: 25px;
    padding: 5px;
    margin-bottom: 2px;
}

.et-sdk-select-dynamic__loading,
.et-sdk-select-dynamic__empty {
    text-align: center;
}

.et-sdk-select-dynamic__option {
    cursor: pointer;
    border-radius: var(--et-sdk-input-border-radius);
    background-color: var(--et-sdk-light-0);
    transition: background-color 150ms ease-in-out;
}

.et-sdk-select-dynamic__option:hover {
    background-color: var(--et-sdk-light-50);
}

.et-sdk-select-dynamic__option--focused {
    background-color: var(--et-sdk-blue-300);
}

.et-sdk-select-dynamic__option--focused:hover {
    background-color: var(--et-sdk-blue-400);
}
</style>
