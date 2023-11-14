<template>
    <div
        class="et-sdk-data-grid--content-row et-sdk-data-grid--row"
        :class="{
            'et-sdk-data-grid--content-row__clickable':
                props.rowInfo.isSelectable
        }"
    >
        <EtDataGridContentSelectCell
            :row="props.row"
            v-if="props.rowInfo.isSelectable"
        />
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { type PropType } from "vue";
import { type DataGridRow } from "../interfaces/DataGridRow";

import EtDataGridContentSelectCell from "src/components/etDataGrid/internals/EtDataGridContentSelectCell.vue";

const props = defineProps({
    rowInfo: {
        type: Object as PropType<DataGridRow>,
        required: true
    },
    row: {
        type: Object as PropType<{ [key: string]: any }>,
        required: true
    }
});
</script>

<style>
.et-sdk-data-grid--content-row {
    display: flex;
    flex-direction: row;
}

.et-sdk-data-grid--content-row__clickable:hover {
    background-color: var(--et-sdk-dark-100);
    cursor: pointer;
}
</style>
