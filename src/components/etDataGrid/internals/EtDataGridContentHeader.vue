<template>
    <div class="et-sdk-data-grid--content-header">
        <div class="et-sdk-data-grid--row et-sdk-data-grid--content-header-row">
            <template v-for="column in columns" :key="column.guid">
                <EtDataGridContentHeaderCell :column="column" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtDataGridContentHeaderCell from "src/components/etDataGrid/internals/EtDataGridContentHeaderCell.vue";

import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { PropType } from "vue";

const props = defineProps({
    columns: {
        type: Array as PropType<DataGridColumn[]>,
        required: true
    }
});
</script>

<style>
.et-sdk-data-grid--content-header-row {
    min-width: fit-content;
    width: 100%;

    display: flex;
    flex-direction: row;

    border-bottom: 1px solid var(--et-sdk-dark-200) !important;
}
</style>
