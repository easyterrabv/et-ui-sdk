<template>
    <div class="et-sdk-data-grid--container">
        <EtDataGridContentContainer>
            <EtDataGridContentHeader :columns="columns" :rowInfo="rowInfo" />
            <EtDataGridContent
                :columns="columns"
                :rowInfo="rowInfo"
                :data="rows"
            />
        </EtDataGridContentContainer>
    </div>
</template>

<script setup lang="ts">
import { cancelable, type CancelablePromise } from "cancelable-promise";

import EtDataGridContentContainer from "src/components/etDataGrid/internals/EtDataGridContentContainer.vue";
import EtDataGridContentHeader from "src/components/etDataGrid/internals/EtDataGridContentHeader.vue";
import EtDataGridContent from "src/components/etDataGrid/internals/EtDataGridContent.vue";

import type { DataGridColumn } from "./interfaces/DataGridColumn";
import { type PropType, watch, provide, ref, type Ref } from "vue";
import type { DataGridRow } from "./interfaces/DataGridRow";
import type {
    CheckedProvide,
    FilterObject,
    FiltersProvide,
    RowObject,
    SortingObject,
    SortingProvide
} from "./interfaces/DataGridMethods";
import { useChecked } from "./composables/useChecked";
import { useSorting } from "./composables/useSorting";
import { useFilters } from "./composables/useFilters";

import { Debounce } from "../../helpers/debounce";

const props = defineProps({
    rowInfo: {
        type: Object as PropType<DataGridRow>,
        required: true
    },
    columns: {
        type: Array as PropType<DataGridColumn[]>,
        required: true
    },
    data: {
        type: Array as PropType<RowObject[]>,
        required: false
    },
    dataGetter: {
        type: Function as PropType<
            (
                filters: FilterObject,
                sorting: SortingObject
            ) => Promise<[RowObject[], number]>
        >,
        required: false
    },
    isMultiSorting: {
        type: Boolean,
        required: false,
        default: false
    }
});

const emit = defineEmits<{
    (e: "checked", rows: RowObject[]): void;
}>();

const rows = ref<RowObject[]>([]);
const isLoading = ref<boolean>(false);
const totalRows = ref<number>(0);

const checkedRows = useChecked<RowObject>(props.rowInfo, () => rows.value);
const sorting = useSorting<RowObject>(props.isMultiSorting);
sorting.reset(props.columns);
const filters = useFilters<RowObject>(props.columns);

let dataRequest: CancelablePromise<[RowObject[], number]>;

async function __searchData() {
    if (!props.dataGetter && !props.data) {
        throw new Error("No Data or DataGetter provided");
    }

    checkedRows.reset();

    let resultRows: RowObject[] = [];
    let resultTotalRows: number = 0;

    if (props.dataGetter) {
        isLoading.value = true;

        dataRequest?.cancel();
        dataRequest = cancelable(
            props.dataGetter(filters.filters || {}, sorting.sorting || {})
        );

        [resultRows, resultTotalRows] = await dataRequest;
        isLoading.value = false;
    }

    if (props.data) {
        resultRows = props.data || [];
        resultTotalRows = resultRows.length;
    }

    rows.value = resultRows;
    totalRows.value = resultTotalRows;
}
const searchDataDebounce = new Debounce(__searchData, 100);

function searchData() {
    searchDataDebounce.debounce();
}

provide<CheckedProvide>("checkedRows", checkedRows);
provide<SortingProvide>("sorting", sorting);
provide<FiltersProvide>("filters", filters);
provide<Ref<boolean>>("isLoading", isLoading);

watch(
    () => ({
        sorting: sorting.sorting,
        filters: filters.filters
    }),
    () => {
        searchData();
    },
    {
        deep: true,
        immediate: true
    }
);

watch(
    () => checkedRows.rows,
    (rows: RowObject[]) => {
        emit("checked", rows);
    },
    {
        deep: true
    }
);

defineExpose({
    setFilters: function (newFilters: FilterObject) {
        filters.setFilters(newFilters);
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

/* used in different files */
.et-sdk-data-grid--content-row {
    display: flex;
    flex-direction: row;
}
</style>
