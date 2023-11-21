<template>
    <div class="et-sdk-data-grid--container">
        <EtDataGridContentContainer>
            <EtDataGridContentHeader
                :columns="columns"
                :rowInfo="rowInfo"
                :bulk-methods="bulkMethods"
            />
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

import EtDataGridContentContainer from "./internals/EtDataGridContentContainer.vue";
import EtDataGridContentHeader from "./internals/EtDataGridContentHeader.vue";
import EtDataGridContent from "./internals/EtDataGridContent.vue";

import type { DataGridColumn } from "./interfaces/DataGridColumn";
import {
    type PropType,
    watch,
    provide,
    ref,
    type Ref,
    type UnwrapNestedRefs
} from "vue";
import type { DataGridRow } from "./interfaces/DataGridRow";
import type {
    BulkMethod,
    CheckedProvide,
    FilterObject,
    FiltersProvide,
    PaginationProvide,
    RowObject,
    SortingObject,
    SortingProvide
} from "./interfaces/DataGridMethods";
import { useChecked } from "./composables/useChecked";
import { useSorting } from "./composables/useSorting";
import { useFilters } from "./composables/useFilters";
import { usePagination } from "./composables/usePagination";

import { Debounce } from "../../helpers/debounce";
import { type IUseUrlData, useUrlData } from "./composables/useUrlData";
import { useRouter, useRoute } from "vue-router";

interface IDataGridCriteria {
    sorting: SortingObject;
    filters: FilterObject;
    page: number;
    perPage: number;
}

const props = defineProps({
    name: {
        type: String,
        required: false
    },
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
                sorting: SortingObject,
                page: number,
                perPage: number
            ) => Promise<[RowObject[], number]>
        >,
        required: false
    },
    bulkMethods: {
        type: Array as PropType<BulkMethod[]>,
        required: false,
        default() {
            return [];
        }
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

const checkedRows = useChecked<RowObject>(props.rowInfo, () => rows.value);
const sorting = useSorting<RowObject>(props.isMultiSorting);
sorting.reset(props.columns);
const filters = useFilters<RowObject>(props.columns);
const pagination = usePagination();
const route = useRoute();
const router = useRouter();

let urlData: UnwrapNestedRefs<IUseUrlData<IDataGridCriteria>>;
if (props.name && route && router) {
    urlData = useUrlData<IDataGridCriteria>(props.name, route, router);

    const savedUrlData = urlData.getDataFromUrl();
    if (savedUrlData?.sorting) {
        sorting.sorting = savedUrlData.sorting;
    }

    if (savedUrlData?.filters) {
        filters.filters = savedUrlData.filters;
    }

    if (savedUrlData?.page) {
        pagination.page = savedUrlData.page;
    }

    if (savedUrlData?.perPage) {
        pagination.perPage = savedUrlData.perPage;
    }
}

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
            props.dataGetter(
                filters.filters || {},
                sorting.sorting || {},
                pagination.page || 1,
                pagination.perPage || 50
            )
        );

        [resultRows, pagination.totalRows] = await dataRequest;
        if (urlData) {
            await urlData.setDataToUrl({
                sorting: sorting.sorting,
                filters: filters.filters,
                page: pagination.page,
                perPage: pagination.perPage
            });
        }
        isLoading.value = false;
    }

    if (props.data) {
        resultRows = props.data || [];
        resultTotalRows = resultRows.length;
    }

    rows.value = resultRows;
}
const searchDataDebounce = new Debounce(__searchData, 100);

function searchData() {
    searchDataDebounce.debounce();
}

provide<CheckedProvide>("checkedRows", checkedRows);
provide<SortingProvide>("sorting", sorting);
provide<FiltersProvide>("filters", filters);
provide<PaginationProvide>("pagination", pagination);
provide<Ref<boolean>>("isLoading", isLoading);
provide<() => void>("searchData", searchData);

watch(
    () => ({
        sorting: sorting.sorting,
        filters: filters.filters,
        page: pagination.page,
        perPage: pagination.perPage
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
    },
    searchData
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
    justify-content: space-between;

    border-bottom: 1px solid var(--et-sdk-dark-100);
}

/* used in different files */
.et-sdk-data-grid--cell {
    padding: 0 6px;
    line-height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 500px;
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

/* used in different files */
.et-sdk-data-grid-icon-button {
    color: var(--et-sdk-dark-400);
    font-weight: var(--et-sdk-font-weight-semibold);
    font-size: var(--et-sdk-font-size-small);

    padding: 8px;
    margin-left: 2px;
    margin-right: 2px;

    border-radius: 9999px;
    cursor: pointer;
}

/* used in different files */
.et-sdk-data-grid-icon-button:not(
        .et-sdk-data-grid-icon-button__disabled
    ):hover {
    background-color: var(--et-sdk-dark-100);
}

/* used in different files */
.et-sdk-data-grid-icon-button:first-child {
    margin-left: 0;
}

/* used in different files */
.et-sdk-data-grid-icon-button:last-child {
    margin-right: 0;
}

/* used in different files */
.et-sdk-data-grid-icon-button__disabled {
    cursor: not-allowed;
    color: var(--et-sdk-dark-300);
}
</style>
