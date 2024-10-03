<template>
    <span class="et-sdk-data-grid__filter-content__filter-value">
        <span class="et-sdk-data-grid__filter-content__filter-value--label">
            {{ filterDisplay.definition.label }}
        </span>
        <template
            v-if="
                filterDisplay.definition.type === FilterInputType.SELECT ||
                filterDisplay.definition.type === FilterInputType.DYNAMIC_SELECT
            "
        >
            <span
                v-for="item in filterDisplay.value"
                class="et-sdk-data-grid__filter-content__filter-value__inner-pill"
            >
                {{ (item as OptionFilterValue).label }}
                <span
                    class="et-sdk-data-grid__filter-content__filter-value__clear"
                    @click.stop="() => removeOption(item)"
                >
                    <EtIconTimes />
                </span>
            </span>
        </template>
        <template
            v-else-if="
                filterDisplay.definition.type === FilterInputType.DATERANGE
            "
        >
            <span v-if="dates && dates[0]">
                {{ dateToFormattedString(dates[0], "short") }}
            </span>
            <span
                class="et-sdk-data-grid__filter-content__filter-value__date-divider"
            >
                <EtIconArrowRightLong />
            </span>
            <span v-if="dates && dates[1]">
                {{ dateToFormattedString(dates[1], "short") }}
            </span>
        </template>
        <template v-else>
            {{ filterDisplay.value }}
        </template>
        <span
            class="et-sdk-data-grid__filter-content__filter-value__clear"
            @click.stop="removeFilter"
        >
            <EtIconTimes />
        </span>
    </span>
</template>

<script setup lang="ts">
import EtIconTimes from "../../../etIcon/EtIconTimes.vue";
import { inject, computed, type PropType } from "vue";
import type { FilterDisplay } from "../../interfaces/DataGridFilters";
import type { OptionFilterValue } from "../../interfaces/DataGridFilters";
import {
    type FilterDateValue,
    FilterInputType
} from "../../interfaces/DataGridFilters";
import { dateToFormattedString } from "../../../../helpers/date";
import EtIconArrowRightLong from "../../../etIcon/EtIconArrowRightLong.vue";
import type { ICriteriaManager } from "../../composables/useCriteriaManager";

const props = defineProps({
    filterDisplay: {
        type: Object as PropType<FilterDisplay>,
        required: true
    }
});

const displayValue = computed(() => props.filterDisplay?.value);
const isArray = computed(() => Array.isArray(displayValue.value));
const criteriaManager = inject<ICriteriaManager>("SDKGridCriteriaManager");

const dates = computed(() => {
    if (props.filterDisplay.definition.type !== FilterInputType.DATERANGE) {
        return undefined;
    }

    return props.filterDisplay.value as FilterDateValue;
});

function removeOption(item: OptionFilterValue) {
    if (!isArray.value) {
        criteriaManager?.setFilter(props.filterDisplay.field, []);
    }

    const currentValues = props.filterDisplay.value || [];
    const newValues = (currentValues as OptionFilterValue[]).filter(
        (val) => val.value !== item.value
    );
    criteriaManager?.setFilter(
        props.filterDisplay.field,
        newValues.length > 0 ? newValues : null
    );
}

function removeFilter() {
    if (!criteriaManager) {
        return;
    }
    criteriaManager.setFilter(props.filterDisplay.field, null);
}
</script>

<style>
.et-sdk-data-grid__filter-content__filter-value {
    background-color: var(--et-sdk-blue-50);
    padding: 6px 15px;
    border: 1px solid var(--et-sdk-dark-300);
    border-radius: 999px;
    margin-right: 5px;
    font-weight: var(--et-sdk-font-weight-semibold);
}

.et-sdk-data-grid__filter-content__filter-value--label {
    color: var(--et-sdk-dark-500);
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal-s);
    margin-right: 5px;
}

.et-sdk-data-grid__filter-content__filter-value__clear {
    color: var(--et-sdk-dark-500);
    font-size: var(--et-sdk-font-size-tiny);
    margin-right: -8px;
    top: -1px;
    position: relative;
    cursor: pointer;
    opacity: 0.3;
}

.et-sdk-data-grid__filter-content__filter-value:hover
    > .et-sdk-data-grid__filter-content__filter-value__clear,
.et-sdk-data-grid__filter-content__filter-value__inner-pill:hover
    > .et-sdk-data-grid__filter-content__filter-value__clear {
    opacity: 1;
}

.et-sdk-data-grid__filter-content__filter-value__inner-pill {
    margin-left: 2px;
    margin-right: 2px;
    padding: 4px 15px 4px 6px;
    background-color: var(--et-sdk-blue-100);
    border-radius: 999px;
    font-size: var(--et-sdk-font-size-small);
}

.et-sdk-data-grid__filter-content__filter-value__date-divider {
    margin-left: 4px;
    margin-right: 4px;
    font-size: var(--et-sdk-font-size-small);
    font-weight: var(--et-sdk-font-weight-normal);
    color: var(--et-sdk-dark-500);
}
</style>
