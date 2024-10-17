<template>
    <div class="et-sdk-data-grid__content-header">
        <div
            v-if="!hideFilters"
            class="et-sdk-data-grid__row et-sdk-data-grid__content-header-row et-sdk-data-grid__content-header-search-input"
        >
            <Teleport
                :to="filterTeleportTarget"
                :disabled="!filterTeleportTarget"
            >
                <EtDataGridFiltersInput
                    :onFilterSave="onFilterSave"
                    :filterDefinitions="filters"
                    :criteriaManager="criteriaManager"
                />
            </Teleport>
        </div>
        <div
            class="et-sdk-data-grid__row et-sdk-data-grid__content-header-row et-sdk-data-grid__content-header-functionality"
        >
            <div class="et-sdk-data-grid__content-header-functionality--left">
                <EtTooltip>
                    <span
                        class="et-sdk-data-grid-icon-button"
                        v-if="searchData"
                        @click="() => searchData?.()"
                    >
                        <EtIconArrowRotateRight :pulse="isRefreshing" />
                    </span>
                    <template #tooltip> Reload </template>
                </EtTooltip>
                <span
                    class="et-sdk-data-grid__content-header-functionality__bulk-methods"
                    v-if="
                        hasBulkMethods && hasAnyChecked && anyBulkMethodsVisible
                    "
                >
                    <EtDataGridContentHeaderBulkMethod
                        v-for="bulkMethod in bulkMethods"
                        :bulk-method="bulkMethod"
                    />
                </span>
            </div>
            <div class="et-sdk-data-grid__content-header-functionality--right">
                <EtDataGridPagination :criteriaManager="criteriaManager" />
            </div>
        </div>
        <div class="et-sdk-data-grid__row et-sdk-data-grid__content-header-row">
            <EtDataGridContentHeaderSelectCell
                v-if="props.rowInfo.isSelectable"
            />
            <template v-for="column in columns" :key="column.guid">
                <EtDataGridContentHeaderCell
                    :column="column"
                    :criteriaManager="criteriaManager"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtDataGridContentHeaderCell from "./EtDataGridContentHeaderCell.vue";
import EtDataGridContentHeaderBulkMethod from "./EtDataGridContentHeaderBulkMethod.vue";
import EtDataGridContentHeaderSelectCell from "./EtDataGridContentHeaderSelectCell.vue";
import EtDataGridFiltersInput from "./filters/EtDataGridFiltersInput.vue";
import EtDataGridPagination from "./EtDataGridPagination.vue";
import EtIconArrowRotateRight from "../../etIcon/EtIconArrowRotateRight.vue";
import EtTooltip from "../../EtToolTip.vue";

import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { PropType, UnwrapNestedRefs } from "vue";
import type { DataGridRow } from "../interfaces/DataGridRow";
import { computed, inject } from "vue";
import type { BulkMethod } from "../interfaces/DataGridMethods";
import type { CheckedProvide } from "../interfaces/DataGridMethods";
import type {
    FilterDefinition,
    FilterObject
} from "../interfaces/DataGridFilters";
import type { ICriteriaManager } from "../composables/useCriteriaManager";

const props = defineProps({
    filterTeleportTarget: {
        type: String,
        required: false,
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
    bulkMethods: {
        type: Array as PropType<BulkMethod[]>,
        required: false,
        default() {
            return [];
        }
    },
    onFilterSave: {
        type: Function as PropType<
            (label: string, filtersObj: FilterObject) => void | null
        >,
        default: null
    },
    filters: {
        type: Array as PropType<FilterDefinition[]>,
        default() {
            return [];
        }
    },
    hideFilters: {
        type: Boolean,
        default: false
    },
    criteriaManager: {
        type: Object as PropType<UnwrapNestedRefs<ICriteriaManager>>,
        required: true
    }
});

const searchData = inject<() => void>("searchData");
const checkedRows = inject<CheckedProvide>("checkedRows");
const isRefreshing = inject<Boolean>("isRefreshing");

const hasBulkMethods = computed(() => (props.bulkMethods || []).length > 0);
const hasAnyChecked = computed(() => checkedRows && checkedRows.anySelected());
const anyBulkMethodsVisible = computed(() => {
    return props.bulkMethods.some((bulkMethod) => {
        if (!hasAnyChecked.value || !checkedRows?.rows) {
            return false;
        }

        if (typeof bulkMethod.isVisible === "boolean") {
            return bulkMethod.isVisible;
        }

        if (bulkMethod.isVisible === undefined) {
            return true;
        }

        return bulkMethod.isVisible(checkedRows?.rows);
    });
});
</script>

<style>
.et-sdk-data-grid__content-header-row {
    min-width: fit-content;
    width: 100%;

    display: flex;
    flex-direction: row;

    border-bottom: 1px solid var(--et-sdk-dark-200) !important;
}

.et-sdk-data-grid__content-header-functionality {
    border-bottom: none !important;
    justify-content: space-between;
    line-height: 40px;
}

.et-sdk-data-grid__content-header-search-input {
    border-bottom: none !important;
}

.et-sdk-data-grid__content-header-functionality__bulk-methods {
    border-left: 1px solid var(--et-sdk-dark-300);
    margin-left: 8px;
    padding-left: 8px;
}
</style>
