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

    <!-- Span element, otherwise the class prop will fall through -->
    <span
        v-else-if="filterType === FilterInputType.CHECKBOX"
        class="et-datagrid-filter-input--checkbox"
    >
        <EtCheckboxWithLabel
            :checked="filterValue as boolean"
            @update:checked="
                (newValue: FilterValue) => setFilterValue(newValue)
            "
        >
            {{ filterDefinition.label }}
        </EtCheckboxWithLabel>
    </span>

    <EtInputSelect
        v-else-if="filterType === FilterInputType.SELECT"
        @update:modelValue="
            (newValues) => setFilterValue(newValues as OptionModel[])
        "
        :modelValue="optionModelValue"
        style="width: 100%"
        :size="UI_SIZING.S"
        :options="options"
        multiple
    />
</template>

<script lang="ts" setup>
import EtInput from "../../../etForm/EtInput.vue";
import EtCheckboxWithLabel from "../../../etForm/EtCheckboxWithLabel.vue";
import EtInputSelect from "../../../etForm/EtInputSelect.vue";

import type { PropType } from "vue";
import type {
    FilterDefinition,
    OptionFilterValue,
    SelectFilterDefinition
} from "../../interfaces/DataGridMethods";

import {
    FilterInputType,
    type FiltersStagingProvide,
    type FilterValue
} from "../../interfaces/DataGridMethods";
import { computed, inject, ref, watchEffect } from "vue";
import { UI_SIZING } from "../../../../helpers/enums";
import { OptionModel } from "../../../../models/Option";

const props = defineProps({
    filterDefinition: {
        type: Object as PropType<FilterDefinition>,
        required: true
    }
});

const dirty = ref(false);

const filterValueStaging = inject<FiltersStagingProvide>("filterValueStaging");

const filterType = computed(
    () => props.filterDefinition?.type ?? FilterInputType.INPUT
);

const filterValue = computed(
    () => filterValueStaging?.getFilter(props.filterDefinition?.field!)
);

const options = ref<Array<OptionModel>>([]);
watchEffect(async () => {
    if (filterType.value !== FilterInputType.SELECT) {
        options.value = [];
        return;
    }

    const definition = props.filterDefinition as SelectFilterDefinition;
    const selectOptions = definition.options;
    if (typeof selectOptions === "function") {
        options.value = await selectOptions();
    } else {
        options.value = selectOptions;
    }
});

const optionModelValue = computed(() => {
    const value: OptionFilterValue[] = (filterValue.value ||
        []) as OptionFilterValue[];
    const flattenedValues = value.map((val) => val.value);
    return (options.value || []).filter((opt) => {
        return flattenedValues.includes(opt.value);
    });
});

const validFilterValue = computed(() => {
    if (!dirty.value) {
        return true;
    }

    if (filterValue.value === null || filterValue.value === undefined) {
        return true;
    }

    return props.filterDefinition?.validator?.(filterValue.value) ?? true;
});

function setFilterValue(newValue: FilterValue | OptionModel[]) {
    const field = props.filterDefinition?.field!;

    let value: FilterValue;
    if (
        Array.isArray(newValue) &&
        filterType.value === FilterInputType.SELECT
    ) {
        value = (newValue as OptionModel[]).map((item: OptionModel) => {
            return {
                value: item.value,
                label: item.label
            } as OptionFilterValue;
        });
    } else {
        value = newValue as FilterValue;
    }

    dirty.value = true;
    filterValueStaging?.setFilter(field, value);
}
</script>

<style>
.et-datagrid-filter-input--checkbox {
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal-s);
    color: var(--et-sdk-dark-500);
}
</style>
