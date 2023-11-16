<template>
    <div class="et-sdk-data-grid--content-header">
        <div
            class="et-sdk-data-grid--row et-sdk-data-grid--content-header-row et-sdk-data-grid--content-header-functionality"
        >
            <div class="et-sdk-data-grid--content-header-functionality__left">
                <span
                    class="et-sdk-data-grid-icon-button"
                    v-if="searchData"
                    @click="() => searchData?.()"
                >
                    <EtIconArrowRotateRight />
                </span>
            </div>
            <div class="et-sdk-data-grid--content-header-functionality__right">
                <EtDataGridPagination />
            </div>
        </div>
        <div class="et-sdk-data-grid--row et-sdk-data-grid--content-header-row">
            <EtDataGridContentHeaderSelectCell
                v-if="props.rowInfo.isSelectable"
            />
            <template v-for="column in columns" :key="column.guid">
                <EtDataGridContentHeaderCell :column="column" />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtDataGridContentHeaderCell from "./EtDataGridContentHeaderCell.vue";
import EtDataGridContentHeaderSelectCell from "./EtDataGridContentHeaderSelectCell.vue";
import EtDataGridPagination from "./EtDataGridPagination.vue";
import EtIconArrowRotateRight from "../../etIcon/EtIconArrowRotateRight.vue";

import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { PropType } from "vue";
import type { DataGridRow } from "../interfaces/DataGridRow";
import { inject } from "vue";

const props = defineProps({
    rowInfo: {
        type: Object as PropType<DataGridRow>,
        required: true
    },
    columns: {
        type: Array as PropType<DataGridColumn[]>,
        required: true
    }
});

const searchData = inject<() => void>("searchData");
</script>

<style>
.et-sdk-data-grid--content-header-row {
    min-width: fit-content;
    width: 100%;

    display: flex;
    flex-direction: row;

    border-bottom: 1px solid var(--et-sdk-dark-200) !important;
}

.et-sdk-data-grid--content-header-functionality {
    border-bottom: none !important;
    justify-content: space-between;
    line-height: 40px;
}
</style>
