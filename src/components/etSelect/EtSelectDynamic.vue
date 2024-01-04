<template>
    <div class="et-sdk-select-dynamic">
        <EtInput
            :placeholder="placeholder"
            theme="grey"
            class="et-sdk-select-dynamic__search"
            v-model="searchInput"
            @enter="handleSearch"
        >
            <template #preIcon>
                <EtIconSearch />
            </template>
        </EtInput>
        <div class="et-sdk-select-dynamic__options">
            <template v-if="loading">
                <div class="et-sdk-select-dynamic__loading">
                    <EtIconSpinner pulse />
                    Searching
                </div>
            </template>
            <template v-else-if="options.length > 0">
                <div
                    v-for="option in options"
                    :key="option.value"
                    @click="(e) => handleOnClick(option)"
                >
                    <slot :option="option">
                        <div class="et-sdk-select-dynamic__option">
                            {{ (option as OptionModel).label }}
                        </div>
                    </slot>
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
import { ref, watch } from "vue";
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

const loading = ref(false);
const searchInput = ref("");
const options = ref<OptionModel[]>([]);
const searchDebounce = new Debounce(handleSearch, 250);
watch(
    () => searchInput.value,
    () => searchDebounce.debounce()
);

async function handleSearch() {
    loading.value = true;
    const result = await props.dataGetter(searchInput.value);
    if (Array.isArray(result)) {
        options.value = result;
    }
    loading.value = false;
}

function handleOnClick(selectedOption: OptionModel) {
    props.onOptionSelect?.(selectedOption);
}
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

.et-sdk-select-dynamic__option:hover {
    cursor: pointer;
    background-color: var(--et-sdk-light-50);
    border-radius: var(--et-sdk-input-border-radius);
}
</style>
