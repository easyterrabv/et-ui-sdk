<template>
    <div class="et-sdk-data-grid-filter">
        <div
            class="et-sdk-data-grid-filter__label"
            :class="{
                'et-sdk-data-grid-filter__label--invalid': !validFilterValue
            }"
        >
            {{ props.filterDefinition.label }}
        </div>

        <div class="et-sdk-data-grid-filter__input">
            <EtInput
                :size="UI_SIZING.S"
                :model-value="filterValue as string"
                @change="(newValue) => setFilterValue(newValue)"
                clear-button
                :error="!validFilterValue"
                @clear="() => setFilterValue(null)"
                @enter="$emit('onEnter')"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type {
    FilterDefinition,
    FilterValue
} from "../../interfaces/DataGridMethods";

import EtInput from "../../../etForm/EtInput.vue";
import { UI_SIZING } from "../../../../helpers/enums";
import { computed, inject, ref } from "vue";
import type { FiltersStagingProvide } from "../../interfaces/DataGridMethods";

const props = defineProps({
    filterDefinition: {
        type: Object as PropType<FilterDefinition>,
        required: true
    }
});

const filterValueStaging = inject<FiltersStagingProvide>("filterValueStaging");
const filterValue = computed(
    () => filterValueStaging?.getFilter(props.filterDefinition.field)
);

const dirty = ref(false);

const validFilterValue = computed(() => {
    if (!dirty.value) {
        return true;
    }

    if (filterValue.value === null || filterValue.value === undefined) {
        return true;
    }

    const validator = props.filterDefinition.validator;
    if (!validator) {
        return true;
    }

    return validator(filterValue.value);
});

function setFilterValue(newValue: FilterValue) {
    const field = props.filterDefinition.field;
    dirty.value = true;
    filterValueStaging?.setFilter(field, newValue);
}
</script>

<style>
.et-sdk-data-grid-filter {
    display: flex;
    flex-direction: row;
    gap: 15px;
}

.et-sdk-data-grid-filter__label {
    width: 150px;
    line-height: 30px;
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal-s);
    color: var(--et-sdk-dark-500);
}

.et-sdk-data-grid-filter__input {
    flex-grow: 1;
}

.et-sdk-data-grid-filter__label--invalid {
    color: var(--et-sdk-red-600);
}
</style>
