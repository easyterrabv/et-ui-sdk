<template>
    <div
        class="et-sdk-data-grid__content-header__cell et-sdk-data-grid__cell"
        :class="[
            column.header?.class,
            {
                'et-sdk-data-grid__content-header__cell--sortable':
                    sorting?.isSortable(column)
            }
        ]"
        @click="() => handleClick()"
        :style="styling"
    >
        <template v-if="column.header">
            <span
                v-if="sorting && sorting.isSortable(column)"
                class="et-sdk-data-grid__content-header__sorting"
            >
                <EtIconSort
                    class="et-sdk-data-grid__content-header__sorting__icon"
                ></EtIconSort>
                <EtIconSortUp
                    class="et-sdk-data-grid__content-header__sorting__icon--direction"
                    v-if="sorting.getSorting(column) === 'ASC'"
                ></EtIconSortUp>
                <EtIconSortDown
                    class="et-sdk-data-grid__content-header__sorting__icon--direction"
                    v-else-if="sorting.getSorting(column) === 'DESC'"
                ></EtIconSortDown>
            </span>
            <template v-if="!customComponent">
                {{ column.header.label }}
            </template>
            <component v-else :is="customComponent" :column="column">
                {{ column.header.label }}
            </component>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { PropType } from "vue";
import { computed, ref, inject } from "vue";
import { getCellStyling } from "../services/DataGridCellHelpers";
import type {
    CellWidthProvide,
    SortingProvide
} from "../interfaces/DataGridMethods";

import EtIconSort from "../../etIcon/EtIconSort.vue";
import EtIconSortUp from "../../etIcon/EtIconSortUp.vue";
import EtIconSortDown from "../../etIcon/EtIconSortDown.vue";

const props = defineProps({
    column: {
        type: Object as PropType<DataGridColumn>,
        required: true
    }
});

const customComponent = ref<object | undefined>(props.column.header?.component);
const sorting = inject<SortingProvide>("sorting");
const cellWidth = inject<CellWidthProvide>("cellWidth");

function handleClick() {
    sorting?.toggleSorting(props.column);
}

const styling = computed(() => {
    return getCellStyling(props.column, cellWidth);
});
</script>

<style>
.et-sdk-data-grid__content-header__cell {
    color: var(--et-sdk-dark-400);
    font-weight: var(--et-sdk-font-weight-semibold);
    font-size: var(--et-sdk-font-size-small);
    text-align: left;

    line-height: 30px !important;
    padding-top: 7px !important;
    padding-bottom: 3px !important;
}

.et-sdk-data-grid__content-header__cell--sortable {
    cursor: pointer;
}

.et-sdk-data-grid__content-header__sorting {
    position: relative;
}

.et-sdk-data-grid__content-header__sorting__icon {
    color: var(--et-sdk-dark-200);
}

.et-sdk-data-grid__content-header__sorting__icon--direction {
    position: absolute;
    left: 0;
    top: 1px;
    color: var(--et-sdk-dark-400);
}
</style>
