<template>
    <div class="et-sdk-data-grid--container">
        <EtDataGridContentContainer>
            <EtDataGridContentHeader :columns="columns" :rowInfo="rowInfo" />
            <EtDataGridContent
                :columns="columns"
                :rowInfo="rowInfo"
                :data="data"
            />
        </EtDataGridContentContainer>
    </div>
</template>

<script setup lang="ts">
import EtDataGridContentContainer from "src/components/etDataGrid/internals/EtDataGridContentContainer.vue";
import EtDataGridContentHeader from "src/components/etDataGrid/internals/EtDataGridContentHeader.vue";
import EtDataGridContent from "src/components/etDataGrid/internals/EtDataGridContent.vue";

import type { DataGridColumn } from "./interfaces/DataGridColumn";
import { type PropType, reactive, watch, provide } from "vue";
import type { DataGridRow } from "./interfaces/DataGridRow";
import type { CheckedProvide } from "./interfaces/DataGridMethods";
import { useChecked } from "./composables/useChecked";

type RowObject = { [key: string]: unknown };

const props = defineProps({
    rowInfo: {
        type: Object as PropType<DataGridRow<RowObject>>,
        required: true
    },
    columns: {
        type: Array as PropType<DataGridColumn<RowObject>[]>,
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

const checkedRows = useChecked<RowObject>(props.rowInfo, props.data);
provide<CheckedProvide<RowObject>>("checkedRows", checkedRows);

watch(
    () => checkedRows.rows,
    (rows) => {
        console.log(rows);
    },
    {
        deep: true,
        immediate: true
    }
);
</script>

<style>
.et-sdk-data-grid--container {
    min-width: 100%;
    width: 100%;
    max-width: 100%;

    min-height: 100%;
    height: 100%;
    max-height: 100%;

    overflow: hidden;

    display: flex;
    flex-direction: column;

    background-color: var(--et-sdk-light-0);
}

/* used in different files */
.et-sdk-data-grid--row {
    min-width: 100%;
    width: fit-content;
    padding-left: 20px;
    padding-right: 20px;

    border-bottom: 1px solid var(--et-sdk-dark-100);
}

/* used in different files */
.et-sdk-data-grid--cell {
    padding: 0 6px;
    line-height: 40px;
}

/* used in different files */
.et-sdk-data-grid--checkbox-cell {
    min-width: 15px;
    width: 15px;
    max-width: 15px;

    box-sizing: content-box;
}

/* used in different files */
.et-sdk-data-grid--checkbox-cell--checkbox {
    display: inline-block;
    vertical-align: middle;
}
</style>
