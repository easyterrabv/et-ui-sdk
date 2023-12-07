<template>
    <span class="et-sdk-data-grid--filter-content--filter-value">
        <span class="et-sdk-data-grid--filter-content--filter-value--label">
            {{ filterDisplay.definition.label }}
        </span>
        <template
            v-if="filterDisplay.definition.type === FilterInputType.SELECT"
        >
            <span
                v-for="item in filterDisplay.value"
                class="et-sdk-data-grid--filter-content--filter-value--inner-pill"
            >
                {{ (item as OptionFilterValue).label }}
                <span
                    class="et-sdk-data-grid--filter-content--filter-value--clear"
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
                {{ dateToFormattedString(dates[0]) }}
            </span>
            <span
                class="et-sdk-data-grid--filter-content--filter-value--date-divider"
                ><EtIconArrowRightLong
            /></span>
            <span v-if="dates && dates[1]">
                {{ dateToFormattedString(dates[1]) }}
            </span>
        </template>
        <template v-else>
            {{ filterDisplay.value }}
        </template>
        <span
            class="et-sdk-data-grid--filter-content--filter-value--clear"
            @click.stop="removeFilter"
        >
            <EtIconTimes />
        </span>
    </span>
</template>

<script setup lang="ts">
import EtIconTimes from "../../../etIcon/EtIconTimes.vue";
import { inject, computed, type PropType } from "vue";
import type {
    FilterDisplay,
    FiltersProvide
} from "../../interfaces/DataGridMethods";
import type { OptionFilterValue } from "../../interfaces/DataGridMethods";
import {
    type FilterDateValue,
    FilterInputType
} from "../../interfaces/DataGridMethods";
import { dateToFormattedString } from "../../../../helpers/date";
import EtIconArrowRightLong from "../../../etIcon/EtIconArrowRightLong.vue";

const props = defineProps({
    filterDisplay: {
        type: Object as PropType<FilterDisplay>,
        required: true
    }
});

const displayValue = computed(() => props.filterDisplay?.value);
const isArray = computed(() => Array.isArray(displayValue.value));
const filters = inject<FiltersProvide>("filters");

const dates = computed(() => {
    if (props.filterDisplay.definition.type !== FilterInputType.DATERANGE) {
        return undefined;
    }

    return props.filterDisplay.value as FilterDateValue;
});

function removeOption(item: OptionFilterValue) {
    if (!isArray.value) {
        filters?.setFilter(props.filterDisplay.field, []);
    }

    const currentValues = props.filterDisplay.value || [];
    filters?.setFilter(
        props.filterDisplay.field,
        (currentValues as OptionFilterValue[]).filter(
            (val) => val.value !== item.value
        )
    );
}

function removeFilter() {
    if (!filters) {
        return;
    }
    filters.setFilter(props.filterDisplay.field, null);
}
</script>

<style>
.et-sdk-data-grid--filter-content--filter-value {
    background-color: var(--et-sdk-blue-50);
    padding: 5px 15px;
    border: 1px solid var(--et-sdk-dark-300);
    border-radius: 999px;
    margin-right: 5px;
    font-weight: var(--et-sdk-font-weight-semibold);
}

.et-sdk-data-grid--filter-content--filter-value--label {
    color: var(--et-sdk-dark-500);
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal-s);
    margin-right: 5px;
}

.et-sdk-data-grid--filter-content--filter-value--clear {
    color: var(--et-sdk-dark-500);
    font-size: var(--et-sdk-font-size-tiny);
    margin-right: -10px;
    top: -1px;
    position: relative;
    cursor: pointer;
    opacity: 0.3;
}

.et-sdk-data-grid--filter-content--filter-value:hover
    > .et-sdk-data-grid--filter-content--filter-value--clear,
.et-sdk-data-grid--filter-content--filter-value--inner-pill:hover
    > .et-sdk-data-grid--filter-content--filter-value--clear {
    opacity: 1;
}

.et-sdk-data-grid--filter-content--filter-value--inner-pill {
    margin-left: 2px;
    margin-right: 2px;
    padding: 4px 15px 4px 6px;
    background-color: var(--et-sdk-blue-100);
    border-radius: 999px;
    font-size: var(--et-sdk-font-size-small);
}

.et-sdk-data-grid--filter-content--filter-value--date-divider {
    margin-left: 4px;
    margin-right: 4px;
    font-size: var(--et-sdk-font-size-small);
    font-weight: var(--et-sdk-font-weight-normal);
    color: var(--et-sdk-dark-500);
}
</style>