<template>
    <div
        class="et-sdk-data-grid--content--cell et-sdk-data-grid--cell"
        :style="styling"
    >
        <template v-if="!customComponent">
            {{ formattedContent }}
        </template>
        <component
            v-else
            :is="customComponent"
            :column="column"
            :row="row"
            :rawContent="rawContent"
            :formattedContent="formattedContent"
        >
            {{ formattedContent }}
        </component>
    </div>
</template>

<script setup lang="ts">
import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { PropType } from "vue";
import { ref, computed, watch } from "vue";
import {
    getCellFormattedContent,
    getCellStyling,
    getContentFromKey
} from "../services/DataGridCellHelpers";

const props = defineProps({
    column: {
        type: Object as PropType<DataGridColumn>,
        required: true
    },
    row: {
        type: Object,
        required: false,
        default() {
            return {};
        }
    }
});

const customComponent = ref<object | undefined>(props.column.content.component);

const styling = computed(() => {
    return getCellStyling(props.column);
});

const rawContent = ref(getContentFromKey(props.row, props.column.content.key));
const formattedContent = ref<string>("");

watch(
    rawContent,
    async () => {
        formattedContent.value = await getCellFormattedContent(
            rawContent.value,
            props.column,
            props.row
        );
    },
    { immediate: true }
);
</script>
