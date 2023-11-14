<template>
    <div class="et-sdk-data-grid--content-wrapper">
        <div class="et-sdk-data-grid--content">
            <EtDataGridContentRow
                v-for="row in data"
                :row="row"
                :rowInfo="rowInfo"
                :key="row[rowKeyIdentifier]"
            >
                <template v-for="column in columns" :key="column.guid">
                    <EtDataGridContentCell :column="column" :row="row" />
                </template>
            </EtDataGridContentRow>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtDataGridContentRow from "src/components/etDataGrid/internals/EtDataGridContentRow.vue";
import EtDataGridContentCell from "src/components/etDataGrid/internals/EtDataGridContentCell.vue";

import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { PropType } from "vue";
import { ref } from "vue";
import type { DataGridRow } from "../interfaces/DataGridRow";

const props = defineProps({
    columns: {
        type: Array as PropType<DataGridColumn[]>,
        required: true
    },
    rowInfo: {
        type: Object as PropType<DataGridRow>,
        required: true
    },
    data: {
        type: Array as PropType<{ [key: string]: any }>,
        required: false,
        default() {
            return [];
        }
    }
});

const rowKeyIdentifier = ref(props.rowInfo?.idKey || "guid");
</script>

<style>
.et-sdk-data-grid--content-wrapper {
    flex-grow: 1;
    overflow-y: auto;

    min-width: fit-content;
    width: 100%;
    min-height: fit-content;
    height: 100%;
}

.et-sdk-data-grid--content-wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.et-sdk-data-grid--content {
    min-width: fit-content;
    width: 100%;
    min-height: fit-content;
    height: 100%;

    display: flex;
    flex-direction: column;
}
</style>
