<template>
    <div class="et-sdk-data-grid--container">
        <EtDataGridContentContainer>
            <EtDataGridContentHeader :columns="columns" />
            <EtDataGridContent :columns="columns" :data="data" />
        </EtDataGridContentContainer>
    </div>
</template>

<script setup lang="ts">
import EtDataGridContentContainer from "src/components/etDataGrid/internals/EtDataGridContentContainer.vue";
import EtDataGridContentHeader from "src/components/etDataGrid/internals/EtDataGridContentHeader.vue";
import EtDataGridContent from "src/components/etDataGrid/internals/EtDataGridContent.vue";

import type { DataGridColumn } from "./interfaces/DataGridColumn";
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
</style>
