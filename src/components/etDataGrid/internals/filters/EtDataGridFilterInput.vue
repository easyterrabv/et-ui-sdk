<template>
    <EtInput
        v-if="filterType === FilterInputType.INPUT"
        :model-value="filterValue as string"
        @change="(newValue) => setFilterValue(newValue)"
        clear-button
        :error="!validFilterValue"
        @clear="() => setFilterValue(null)"
        @enter="(newValue) => setFilterValue(newValue)"
    />

    <!-- Span element, otherwise the class prop will fall through -->
    <span
        v-else-if="filterType === FilterInputType.CHECKBOX"
        class="et-datagrid-filter-input--checkbox"
    >
        <EtCheckboxWithLabel
            :checked="filterValue as boolean"
            @update:checked="(newValue) => setFilterValue(newValue)"
        >
            {{ filterDefinition.label }}
        </EtCheckboxWithLabel>
    </span>

    <EtInputSelect
        v-else-if="filterType === FilterInputType.SELECT"
        @update:modelValue="
            (newValues) => setFilterValueFromSelect(newValues as OptionModel[])
        "
        :modelValue="optionModelValue"
        class="et-datagrid-filter-input--select"
        :options="options"
        multiple
    />

    <EtInputDateRange
        v-else-if="filterType === FilterInputType.DATERANGE"
        @update:modelValue="
            (dates) =>
                setFilterValueFromDateRange(dates as Array<Date | null> | null)
        "
        :modelValue="filterValue as FilterDateValue"
    />
</template>

<script lang="ts" setup>
import EtInput from "../../../etForm/EtInput.vue";
import EtCheckboxWithLabel from "../../../etForm/EtCheckboxWithLabel.vue";
import EtInputSelect from "../../../etForm/EtInputSelect.vue";
import EtInputDateRange from "../../../etForm/EtInputDateRange.vue";

import type { PropType } from "vue";
import type {
    FilterDateValue,
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

function setFilterValueFromSelect(newValues: OptionModel[]) {
    setFilterValue(
        (newValues as OptionModel[]).map((item: OptionModel) => {
            return {
                value: item.value,
                label: item.label
            } as OptionFilterValue;
        })
    );
}

function setFilterValueFromDateRange(dates: Array<Date | null> | null) {
    let values: FilterDateValue = [null, null];

    if (dates && Array.isArray(dates)) {
        if (dates.length <= 0) {
            values = [null, null];
        } else if (dates.length === 1) {
            values = [dates[0], dates[0]];
        } else if (dates.length >= 2) {
            values = [dates[0] || null, dates[1] || null];
        }
    }

    setFilterValue(values);
}

function setFilterValue(newValue: FilterValue) {
    const field = props.filterDefinition?.field!;
    dirty.value = true;
    filterValueStaging?.setFilter(field, newValue);
}
</script>

<style>
.et-datagrid-filter-input--checkbox {
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal-s);
    color: var(--et-sdk-dark-500);
}

.et-datagrid-filter-input--select {
    width: 100%;
}
</style>
