<template>
    <div class="et-sdk-data-grid--content-wrapper">
        <div class="et-sdk-data-grid--content">
            <template v-for="row in data">
                <div
                    class="et-sdk-data-grid--content-row et-sdk-data-grid--row et-sdk-data-grid--content-row__clickable"
                >
                    <template v-for="column in columns" :key="column.guid">
                        <EtDataGridContentCell :column="column" :row="row" />
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtDataGridContentCell from "src/components/etDataGrid/internals/EtDataGridContentCell.vue";

import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { PropType } from "vue";

const props = defineProps({
    columns: {
        type: Array as PropType<DataGridColumn[]>,
        required: true
    },
    data: {
        type: Array as PropType<object[]>,
        required: false,
        default() {
            return [];
        }
    }
});
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

.et-sdk-data-grid--content-row {
    display: flex;
    flex-direction: row;
}

.et-sdk-data-grid--content-row__clickable:hover {
    background-color: var(--et-sdk-dark-100);
    cursor: pointer;
}
</style>
