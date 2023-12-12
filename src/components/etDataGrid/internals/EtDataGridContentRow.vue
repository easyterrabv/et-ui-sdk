<template>
    <div
        class="et-sdk-data-grid__content-row et-sdk-data-grid__row"
        :class="[
            {
                'et-sdk-data-grid__content-row--clickable': isRowClickable,
                'et-sdk-data-grid__content-row--checked': isRowChecked
            },
            ...rowClasses
        ]"
        @click.stop="() => handleClick()"
    >
        <EtDataGridContentSelectCell
            :row="props.row"
            v-if="props.rowInfo.isSelectable"
        />
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { type PropType, inject, computed } from "vue";
import { type DataGridRow } from "../interfaces/DataGridRow";

import EtDataGridContentSelectCell from "./EtDataGridContentSelectCell.vue";
import type { CheckedProvide } from "../interfaces/DataGridMethods";
import type { RowObject } from "../interfaces/DataGridMethods";
import { getRowClass } from "../services/DataGridRowHelpers";

const props = defineProps({
    rowInfo: {
        type: Object as PropType<DataGridRow>,
        required: true
    },
    row: {
        type: Object as PropType<RowObject>,
        required: true
    }
});

const checkedRows = inject<CheckedProvide>("checkedRows");
const rowClasses = getRowClass(props.rowInfo, props.row);

const isRowChecked = computed(() => {
    if (!props.rowInfo.isSelectable) {
        return false;
    }
    return checkedRows?.isSelected(props.row);
});

const isRowClickable = computed(() => {
    return !!props.rowInfo.onRowClick;
});

async function handleClick() {
    if (checkedRows?.anySelected()) {
        checkedRows?.toggle(props.row);
        return;
    }

    if (isRowClickable) {
        await props.rowInfo.onRowClick?.(props.row);
    }
}
</script>

<style>
.et-sdk-data-grid__content-row--clickable:hover {
    background-color: var(--et-sdk-dark-100);
    cursor: pointer;
}

.et-sdk-data-grid__content-row--checked {
    background-color: var(--et-sdk-dark-100);
}

.et-sdk-data-grid__content-row--checked.et-sdk-data-grid__content-row--clickable:hover {
    background-color: var(--et-sdk-dark-200);
}
</style>
