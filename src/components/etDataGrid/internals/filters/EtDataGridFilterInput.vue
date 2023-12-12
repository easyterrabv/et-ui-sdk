<template>
    <EtInput
        v-if="filterType === FilterInputType.INPUT"
        :size="UI_SIZING.S"
        :model-value="filterValue as string"
        @change="(newValue) => setFilterValue(newValue)"
        clear-button
        ref="input"
        :error="!validFilterValue"
        @clear="() => setFilterValue(null)"
        @enter="(newValue) => setFilterValue(newValue)"
    />

    <!-- Span element, otherwise the class prop will fall through -->
    <span
        v-else-if="filterType === FilterInputType.CHECKBOX"
        class="et-datagrid-filter-input__checkbox"
    >
        <EtCheckboxWithLabel
            :checked="filterValue as boolean"
            ref="input"
            @update:checked="(newValue) => setFilterValue(newValue)"
        >
            {{ filterDefinition.label }}
        </EtCheckboxWithLabel>
    </span>

    <EtInputSelect
        v-else-if="filterType === FilterInputType.SELECT"
        :size="UI_SIZING.S"
        ref="input"
        @update:modelValue="
            (newValues) => setFilterValueFromSelect(newValues as OptionModel[])
        "
        :modelValue="optionModelValue"
        class="et-datagrid-filter-input__select"
        :options="options"
        :multiple="multiple"
    />

    <EtInputDateRange
        v-else-if="filterType === FilterInputType.DATERANGE"
        :size="UI_SIZING.S"
        ref="input"
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
import { computed, inject, type Ref, ref, watch, watchEffect } from "vue";
import { UI_SIZING } from "../../../../helpers/enums";
import { OptionModel } from "../../../../models/Option";

const props = defineProps({
    filterDefinition: {
        type: Object as PropType<FilterDefinition>,
        required: true
    }
});

const dirty = ref(false);
const input = ref(null);

const filterValueStaging = inject<FiltersStagingProvide>("filterValueStaging");
const dropDownVisible = inject<Ref<boolean>>("dropDownVisible");
watch(
    () => dropDownVisible?.value,
    (value) => {
        if (value === false) {
            (input?.value as any)?.hide?.();
        }
    }
);

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

const multiple = computed(() => {
    if (filterType.value !== FilterInputType.SELECT) {
        return false;
    }
    const definition = props.filterDefinition as SelectFilterDefinition;
    return definition.multiple ?? false;
});

const optionModelValue = computed(() => {
    const value: OptionFilterValue[] = (filterValue.value ||
        []) as OptionFilterValue[];
    const flattenedValues = value.map((val) => val.value);
    const opts = (options.value || []).filter((opt) => {
        return flattenedValues.includes(opt.value);
    });

    if (multiple.value) {
        return opts;
    } else if (opts.length > 0) {
        return opts[0];
    } else {
        return null;
    }
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

function setFilterValueFromSelect(newValues: OptionModel[] | OptionModel) {
    let values: OptionModel[];

    if (Array.isArray(newValues)) {
        values = newValues;
    } else {
        values = [newValues];
    }

    setFilterValue(
        values
            .filter((val) => !!val)
            .map((item: OptionModel) => {
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
            setFilterValue(null);
        } else if (dates.length === 1) {
            values = [dates[0], dates[0]];
        } else if (dates.length >= 2) {
            values = [dates[0] || null, dates[1] || null];
        }
    }

    if (!values[0] && !values[1]) {
        setFilterValue(null);
    } else {
        setFilterValue(values);
    }
}

function setFilterValue(newValue: FilterValue) {
    const field = props.filterDefinition?.field!;
    dirty.value = true;

    if (newValue && Array.isArray(newValue) && newValue.length <= 0) {
        filterValueStaging?.setFilter(field, null);
        return;
    }

    filterValueStaging?.setFilter(field, newValue);
}
</script>

<style>
.et-datagrid-filter-input__checkbox {
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal-s);
    color: var(--et-sdk-dark-500);
}

.et-datagrid-filter-input__select {
    width: 100%;
}
</style>
