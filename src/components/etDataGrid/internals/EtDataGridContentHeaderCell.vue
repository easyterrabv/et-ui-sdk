<template>
    <div
        class="et-sdk-data-grid--content-header--cell et-sdk-data-grid--cell"
        :style="styling"
    >
        <template v-if="column.header">
            <template v-if="!customComponent">
                {{ column.header.label }}
            </template>
            <component v-else :is="customComponent" :column="column">
                {{ column.header.label }}
            </component>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { PropType } from "vue";
import { computed, ref } from "vue";
import { getCellStyling } from "../services/DataGridCellHelpers";

const props = defineProps({
    column: {
        type: Object as PropType<DataGridColumn>,
        required: true
    }
});

const customComponent = ref<object | undefined>(props.column.header?.component);

const styling = computed(() => {
    return getCellStyling(props.column);
});
</script>

<style>
.et-sdk-data-grid--content-header--cell {
    color: var(--et-sdk-dark-400);
    font-weight: var(--et-sdk-font-weight-semibold);
    font-size: var(--et-sdk-font-size-small);
    text-align: left;
}
</style>
