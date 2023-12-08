<template>
    <div class="et-sdk-data-grid--content-wrapper">
        <div class="et-sdk-data-grid--content">
            <template v-if="!isLoading && data.length > 0">
                <EtDataGridContentRow
                    v-for="row in data"
                    :row="row"
                    :rowInfo="rowInfo"
                    :key="keys[row[rowKeyIdentifier]] || row[rowKeyIdentifier]"
                >
                    <template v-for="column in columns" :key="column.guid">
                        <EtDataGridContentCell :column="column" :row="row" />
                    </template>
                </EtDataGridContentRow>
            </template>
            <EtDataGridNoContentRow
                v-else-if="!isLoading && data.length <= 0"
            />
            <EtDataGridContentLoadingRow v-else />
        </div>
    </div>
</template>

<script setup lang="ts">
import EtDataGridContentRow from "./EtDataGridContentRow.vue";
import EtDataGridContentLoadingRow from "./EtDataGridContentLoadingRow.vue";
import EtDataGridContentCell from "./EtDataGridContentCell.vue";

import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { PropType, Ref } from "vue";
import { ref, inject, computed } from "vue";
import type { DataGridRow } from "../interfaces/DataGridRow";
import type { RowObject } from "../interfaces/DataGridMethods";
import { getContentFromKey } from "../services/DataGridCellHelpers";
import type { RowVersionProvider } from "../interfaces/DataGridMethods";
import EtDataGridNoContentRow from "./EtDataGridNoContentRow.vue";

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
        type: Array as PropType<RowObject[]>,
        required: false,
        default() {
            return [];
        }
    }
});

const rowKeyIdentifier = ref(props.rowInfo?.idKey || "guid");
const rowVersion = inject<RowVersionProvider>("rowVersion");

const keys = computed(() => {
    const _ks: Record<string, string> = {};
    (props.data || []).forEach((row) => {
        const k = getContentFromKey(row, rowKeyIdentifier.value);
        const version = rowVersion?.versions[k] || 0;
        _ks[k] = `${k}-v${version}`;
    });

    return _ks;
});

const isLoading = inject<Ref<boolean>>("isLoading");
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
