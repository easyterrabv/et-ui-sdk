<template>
    <div class="et-sdk-data-grid__container" ref="container">
        <EtDataGridContentContainer>
            <EtDataGridContentHeader
                :filterTeleportTarget="filterTeleportTarget"
                :columns="columns"
                :rowInfo="rowInfo"
                :bulk-methods="bulkMethods"
                :filters="filters"
                :onFilterSave="onFilterSave"
                :hideFilters="hideFilters"
                :criteriaManager="criteriaManager"
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
    type UnwrapNestedRefs,
    onMounted,
    onBeforeUnmount
} from "vue";
import type { DataGridRow } from "./interfaces/DataGridRow";
import type {
    BulkMethod,
    CellWidthProvide,
    CheckedProvide,
    RowVersionProvider,
    SortingObject
} from "./interfaces/DataGridMethods";
import type {
    FilterDefinition,
    FilterObject
} from "./interfaces/DataGridFilters";
import { useChecked } from "./composables/useChecked";

import { Debounce } from "../../helpers/debounce";
import { type IUseUrlData, useUrlData } from "./composables/useUrlData";
import { useRouter, useRoute } from "vue-router";
import { useCellWidth } from "./composables/useCellWidth";
import { useRowVersion } from "./composables/useRowVersion";
import { assignToPath } from "./services/DataGridCellHelpers";
import type { RowObject } from "./interfaces/DataRowObject";
import type { IDataGridCriteria } from "./interfaces/DataGridCriteria";
import {
    type ICriteriaManager,
    useCriteriaManager
} from "./composables/useCriteriaManager";

const props = defineProps({
    filterTeleportTarget: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
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
        default: null
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
        default: null
    },
    bulkMethods: {
        type: Array as PropType<BulkMethod[]>,
        default() {
            return [];
        }
    },
    filters: {
        type: Array as PropType<FilterDefinition[]>,
        default() {
            return [];
        }
    },
    isMultiSorting: {
        type: Boolean,
        default: false
    },
    onFilterSave: {
        type: Function as PropType<
            (label: string, filtersObj: FilterObject) => void | null
        >,
        default: null
    },
    hideFilters: {
        type: Boolean,
        default: false
    },
    criteriaManager: {
        type: Object as PropType<UnwrapNestedRefs<ICriteriaManager>>,
        default: null,
        required: false
    },
    saveToUrl: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits<{
    (e: "checked", rows: RowObject[]): void;
    (e: "filtersCleared"): void;
}>();

const rows = ref<RowObject[]>([]);
const isLoading = ref<boolean>(false);

const checkedRows = useChecked<RowObject>(props.rowInfo, () => rows.value);
const cellWidth = useCellWidth();
const rowVersion = useRowVersion<RowObject>(props.rowInfo?.idKey || "guid");
const route = useRoute();
const router = useRouter();

let urlData: UnwrapNestedRefs<IUseUrlData<IDataGridCriteria>> | undefined;
if (props.name && props.saveToUrl && route && router) {
    urlData = useUrlData<IDataGridCriteria>(props.name, route, router);
}

let criteriaManager: UnwrapNestedRefs<ICriteriaManager>;
if (props.criteriaManager) {
    criteriaManager = props.criteriaManager;
} else {
    criteriaManager = useCriteriaManager({
        useUrlData: urlData || undefined,
        // They use the same prop for now
        saveToUrl: props.saveToUrl,
        loadFromUrl: props.saveToUrl,
        isMultiSorting: props.isMultiSorting
    });
}

const urlDataValues = urlData?.getDataFromUrl();
if (
    !urlDataValues ||
    !urlDataValues.sorting ||
    Object.keys(urlDataValues.sorting).length === 0
) {
    criteriaManager.resetSorting(props.columns);
}

let dataRequest: CancelablePromise<[RowObject[], number]>;

async function __searchData() {
    if (!props.dataGetter && !props.data) {
        throw new Error("No Data or DataGetter provided");
    }

    checkedRows.reset();

    let resultRows: RowObject[] = [];

    const filtersFormattedValues = Object.entries(
        (criteriaManager.criteria.filters || {}) as unknown as FilterObject
    ).reduce((prev, [key, value]) => {
        const definition = props.filters?.find((def) => def.field === key);

        if (!definition || !definition.formatter) {
            prev[key] = value;
        } else {
            prev[key] = definition.formatter(value);
        }

        return prev;
    }, {} as FilterObject);

    if (props.dataGetter) {
        isLoading.value = true;

        dataRequest?.cancel();

        dataRequest = cancelable(
            props.dataGetter(
                filtersFormattedValues || {},
                criteriaManager.criteria.sorting || {},
                criteriaManager.criteria.page || 1,
                criteriaManager.criteria.perPage || 50
            )
        );

        [resultRows, criteriaManager.totalRows] = await dataRequest;
        isLoading.value = false;
    }

    if (props.data) {
        resultRows = props.data || [];
    }

    rows.value = resultRows;
}
const searchDataDebounce = new Debounce(__searchData, 100);

function searchData() {
    searchDataDebounce.debounce();
}

provide<CheckedProvide>("checkedRows", checkedRows);
provide<Ref<boolean>>("isLoading", isLoading);
provide<() => void>("searchData", searchData);
provide<CellWidthProvide>("cellWidth", cellWidth);
provide<RowVersionProvider>("rowVersion", rowVersion);

const prevFilterValues = ref<FilterObject>({});

watch(
    () => criteriaManager.criteria.filters,
    () => {
        if (
            Object.keys(prevFilterValues.value).length > 0 &&
            Object.keys(criteriaManager.criteria.filters || {}).length === 0
        ) {
            emit("filtersCleared");
        }

        criteriaManager.criteria.page = 1;
        searchData();
        prevFilterValues.value = criteriaManager.criteria.filters || {};
    },
    { deep: true, immediate: true }
);
watch(() => criteriaManager.criteria.sorting, searchData, { deep: true });
watch(() => criteriaManager.criteria.page, searchData);
watch(() => criteriaManager.criteria.perPage, searchData);

watch(
    () => checkedRows.rows,
    (rows: RowObject[]) => {
        emit("checked", rows);
    },
    {
        deep: true
    }
);

function patchRow(rowId: string | number, data: any) {
    const dataValues = Object.entries<any>(data);

    (rows.value || []).forEach((row, index) => {
        if (row[props.rowInfo.idKey] === rowId) {
            dataValues.forEach(([key, value]) => {
                assignToPath(row, key, value);
            });
            rowVersion.increment(row);
        }
    });
}

defineExpose({
    checked: checkedRows,
    filters: {
        values: (criteriaManager.criteria.filters ||
            {}) as unknown as FilterObject,
        setFilters(newFilters: FilterObject) {
            criteriaManager.setFilters(newFilters);
        }
    },
    urlData: urlData ? urlData : null,
    patchRow,
    searchData
});

function calculateMaxCellWidth() {
    const tableWidth = (container.value as any).getBoundingClientRect().width;
    cellWidth.calculate(
        tableWidth,
        props.columns,
        props.rowInfo.isSelectable || false
    );
}

const container = ref(null);
onMounted(() => {
    calculateMaxCellWidth();
    window.addEventListener("resize", calculateMaxCellWidth);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", calculateMaxCellWidth);
});
</script>

<style>
.et-sdk-data-grid__container {
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
    font-size: var(--et-sdk-font-size-normal-s);
}

/* used in different files */
.et-sdk-data-grid__row {
    min-width: 100%;
    width: fit-content;
    padding-left: 20px;
    padding-right: 20px;

    border-bottom: 1px solid var(--et-sdk-dark-100);
}

/* used in different files */
.et-sdk-data-grid__cell {
    padding: 0 6px;
    line-height: 40px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

/* used in different files */
.et-sdk-data-grid__checkbox-cell {
    min-width: 15px;
    width: 15px;
    max-width: 15px;

    box-sizing: content-box;
    text-overflow: initial;
}

/* used in different files */
.et-sdk-data-grid__checkbox-cell__checkbox {
    display: inline-block;
    vertical-align: middle;
}

/* used in different files */
.et-sdk-data-grid__content-row {
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
        .et-sdk-data-grid-icon-button--disabled
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
.et-sdk-data-grid-icon-button--disabled {
    cursor: not-allowed;
    color: var(--et-sdk-dark-300);
}
</style>
