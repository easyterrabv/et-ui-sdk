<template>
    <span class="et-sdk-data-grid--filter-content--filter-value">
        <span class="et-sdk-data-grid--filter-content--filter-value--label">
            {{ filterDisplay.label }}
        </span>
        <template v-if="!isArray">
            {{ filterDisplay.value }}
        </template>
        <template v-else>
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
        <span
            class="et-sdk-data-grid--filter-content--filter-value--clear"
            @click.stop="() => filters?.setFilter(filterDisplay.field, null)"
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

const props = defineProps({
    filterDisplay: {
        type: Object as PropType<FilterDisplay>,
        required: true
    }
});

const displayValue = computed(() => props.filterDisplay?.value);
const isArray = computed(() => Array.isArray(displayValue.value));
const filters = inject<FiltersProvide>("filters");

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
</script>

<style>
.et-sdk-data-grid--filter-content--filter-value {
    background-color: var(--et-sdk-light-0);
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
    background-color: var(--et-sdk-dark-100);
    border-radius: 999px;
    font-size: var(--et-sdk-font-size-small);
}
</style>
