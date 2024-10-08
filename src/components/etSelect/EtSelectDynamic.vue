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
            clear-button
            wrapperClasses="et-sdk-select-dynamic__search"
            v-model="searchInput"
            @enter="handleInputEnterPressed"
        >
            <template #pre>
                <EtIconSearch class="et-sdk-select-dynamic__search__icon" />
            </template>
        </EtInput>
        <div
            class="et-sdk-select-dynamic__options hide-scrollbar"
            ref="optionsContainer"
        >
            <template v-if="loading">
                <div class="et-sdk-select-dynamic__loading">
                    <EtIconSpinner pulse />
                    Searching
                </div>
            </template>
            <template v-else-if="options.length > 0">
                <div
                    v-for="(option, index) in options"
                    :key="option.guid"
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
                            <div class="et-sdk-select-dynamic__option__content">
                                <span>
                                    {{ (option as OptionModel).label }}
                                </span>

                                <EtIconCheckSolid v-if="isChecked(option)" />
                            </div>
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
import { nextTick, ref, watch } from "vue";
import { OptionModel } from "../../models/Option";
import { Debounce } from "../../helpers/debounce";
import EtIconSpinner from "../etIcon/EtIconSpinner.vue";
import EtIconCheckSolid from "../etIcon/EtIconCheckSolid.vue";

const props = defineProps({
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
            (value: OptionModel | OptionModel[] | null) => void
        >,
        required: true
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

const input = ref(null);
const optionsContainer = ref<HTMLElement | null>(null);
const focusedIndex = ref(-1);
const loading = ref(false);

const searchInput = ref("");
const resultSearchInput = ref("");
const internalSelectedOption = ref<OptionModel | OptionModel[] | null>(null);

watch(
    () => props.selectedOption,
    () => {
        internalSelectedOption.value = props.selectedOption;
    },
    { immediate: true }
);

const options = ref<OptionModel[]>([]);
const searchDebounce = new Debounce(handleSearch, 250);

watch(
    () => searchInput.value,
    () => searchDebounce.debounce()
);

watch(
    () => focusedIndex.value,
    async (value) => {
        const parentContainer = optionsContainer.value as HTMLElement;
        if (!parentContainer) {
            return;
        }

        if (value <= -1) {
            parentContainer.scrollTop = 0;
            return;
        }

        await nextTick();

        const focussedItems = parentContainer.getElementsByClassName(
            "et-sdk-select-dynamic__option--focused"
        );
        if (focussedItems.length <= 0) {
            return;
        }

        const firstItem = focussedItems[0] as HTMLElement;
        if (!firstItem) {
            return;
        }

        const parentOffset = parentContainer.offsetTop;
        const firstItemOffset = firstItem.offsetTop;
        const offsetTop = firstItemOffset - parentOffset;
        const nextPos = offsetTop - firstItem.getBoundingClientRect().height;
        parentContainer.scrollTo({
            top: nextPos < 0 ? 0 : nextPos,
            behavior: "smooth"
        });
    }
);

function isChecked(option: OptionModel) {
    if (!internalSelectedOption.value) {
        return false;
    }

    if (Array.isArray(internalSelectedOption.value)) {
        return (
            internalSelectedOption.value.findIndex(
                (opt) => opt.value === option.value
            ) > -1
        );
    }

    return internalSelectedOption.value.value === option.value;
}

async function handleSearch() {
    loading.value = true;
    focusedIndex.value = -1;

    const result = await props.dataGetter?.(searchInput.value);
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

    if (props.multiple) {
        if (!Array.isArray(internalSelectedOption.value)) {
            internalSelectedOption.value = [];
        }

        const isChecked =
            internalSelectedOption.value.findIndex(
                (opt: OptionModel) => opt.value === selectedOption.value
            ) > -1;
        if (isChecked) {
            internalSelectedOption.value = internalSelectedOption.value.filter(
                (opt: OptionModel) => opt.value !== selectedOption.value
            );
        } else {
            internalSelectedOption.value.push(selectedOption);
        }
    } else {
        internalSelectedOption.value = selectedOption;
    }

    props.onOptionSelect?.(internalSelectedOption.value);
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
    min-width: 360px;
    padding: 12px;
    box-shadow: var(--et-sdk-shadow-normal);
    border-radius: var(--et-sdk-input-border-radius);
    background-color: var(--et-sdk-light-0);
}

.et-sdk-select-dynamic__search {
    margin-bottom: 12px;
}

.et-sdk-select-dynamic__search__icon {
    color: var(--et-sdk-dark-500);
}

.et-sdk-select-dynamic__options {
    max-height: 300px;
    overflow-y: auto;
}

.et-sdk-select-dynamic__loading,
.et-sdk-select-dynamic__option,
.et-sdk-select-dynamic__empty {
    line-height: 25px;
    padding: 9px 5px;
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
    background-color: var(--et-sdk-light-100);
}

.et-sdk-select-dynamic__option--focused {
    background-color: var(--et-sdk-blue-300);
}

.et-sdk-select-dynamic__option--focused:hover {
    background-color: var(--et-sdk-blue-400);
}

.et-sdk-select-dynamic__option__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
