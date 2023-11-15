<template>
    <div
        class="et-sdk-data-grid--content-row et-sdk-data-grid--row"
        :class="{
            'et-sdk-data-grid--content-row__clickable': isRowClickable,
            'et-sdk-data-grid--content-row__checked': isRowChecked
        }"
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

import EtDataGridContentSelectCell from "src/components/etDataGrid/internals/EtDataGridContentSelectCell.vue";
import type { CheckedProvide } from "../interfaces/DataGridMethods";
import type { RowObject } from "../interfaces/DataGridMethods";

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
.et-sdk-data-grid--content-row__clickable:hover {
    background-color: var(--et-sdk-dark-100);
    cursor: pointer;
}

.et-sdk-data-grid--content-row__checked {
    background-color: var(--et-sdk-dark-100);
}

.et-sdk-data-grid--content-row__checked.et-sdk-data-grid--content-row__clickable:hover {
    background-color: var(--et-sdk-dark-200);
}
</style>
