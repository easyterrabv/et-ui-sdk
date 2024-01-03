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
            <div v-for="option in options" :key="option.value">
                <slot :option="option">
                    <div class="et-sdk-select-dynamic__option">
                        {{ option.label }}
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtInput from "../etForm/EtInput.vue";
import EtIconSearch from "../etIcon/EtIconSearch.vue";
import type { PropType } from "vue";
import { onMounted, ref } from "vue";
import { OptionModel } from "../../models/Option";

const props = defineProps({
    preload: {
        type: Boolean,
        default: true
    },
    dataGetter: {
        type: Function as PropType<
            (searchInput: string) => Promise<OptionModel[]>
        >
        // required: true
    },
    placeholder: {
        type: String,
        default: "Filter Options"
    },
    onOptionSelect: {
        type: Function as PropType<(selectedOption: OptionModel) => void>
        // required: true
    }
});

const searchInput = ref<string>("");
const options = ref<OptionModel[]>([]);

async function handleSearch() {
    // TEMP
    options.value = [
        new OptionModel({
            value: 1,
            label: "Item one"
        }),
        new OptionModel({
            value: 2,
            label: "Item two"
        }),
        new OptionModel({
            value: 3,
            label: "Item three"
        }),
        new OptionModel({
            value: 4,
            label: "Item four"
        }),
        new OptionModel({
            value: 5,
            label: "Item five"
        }),
        new OptionModel({
            value: 6,
            label: "Item six"
        }),
        new OptionModel({
            value: 7,
            label: "Item seven"
        }),
        new OptionModel({
            value: 8,
            label: "Item eight"
        })
    ];

    // const result = props.dataGetter(searchInput.value);
    // if (Array.isArray(result)) {
    //     options.value = result;
    // }
}

onMounted(() => {
    if (props.preload) {
        handleSearch();
    }
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

.et-sdk-select-dynamic__option {
    line-height: 25px;
    padding: 5px;
    margin-bottom: 2px;
}

.et-sdk-select-dynamic__option:hover {
    cursor: pointer;
    background-color: var(--et-sdk-light-50);
    border-radius: var(--et-sdk-input-border-radius);
}
</style>
