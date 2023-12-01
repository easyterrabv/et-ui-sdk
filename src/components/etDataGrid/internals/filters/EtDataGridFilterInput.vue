<template>
    <EtInput
        v-if="filterType === FilterInputType.INPUT"
        :size="UI_SIZING.S"
        :model-value="filterValue as string"
        @change="(newValue: FilterValue) => setFilterValue(newValue)"
        clear-button
        :error="!validFilterValue"
        @clear="() => setFilterValue(null)"
        @enter="(newValue: FilterValue) => setFilterValue(newValue)"
    />
</template>

<script lang="ts" setup>
import EtInput from "../../../etForm/EtInput.vue";

import type { PropType } from "vue";
import type { FilterDefinition } from "../../interfaces/DataGridMethods";

import {
    FilterInputType,
    type FiltersStagingProvide,
    type FilterValue
} from "../../interfaces/DataGridMethods";
import { computed, inject, ref } from "vue";
import { UI_SIZING } from "../../../../helpers/enums";

const props = defineProps({
    filterDefinition: {
        type: Object as PropType<FilterDefinition>,
        required: true
    }
});

const dirty = ref(false);

const filterValueStaging = inject<FiltersStagingProvide>("filterValueStaging");
const filterType = computed(
    () => props.filterDefinition.type ?? FilterInputType.INPUT
);
const filterValue = computed(
    () => filterValueStaging?.getFilter(props.filterDefinition.field)
);
const validFilterValue = computed(() => {
    if (!dirty.value) {
        return true;
    }

    if (filterValue.value === null || filterValue.value === undefined) {
        return true;
    }

    return props.filterDefinition.validator?.(filterValue.value) ?? true;
});

function setFilterValue(newValue: FilterValue) {
    const field = props.filterDefinition.field;
    dirty.value = true;
    filterValueStaging?.setFilter(field, newValue);
}
</script>
