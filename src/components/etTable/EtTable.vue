<template>
    <div class="et-sdk-table-wrapper">
        <table class="et-sdk-table">
            <thead
                v-if="$slots.header || ($slots.filters && !isStatic)"
                class="et-sdk-table--head"
            >
                <tr
                    v-if="$slots.header"
                    class="et-sdk-table--head-row"
                    :class="{
                        'et-sdk-table--head-row__no-filters': !(
                            $slots.filters && !isStatic
                        ),
                        'et-sdk-table--head-row__filters':
                            $slots.filters && !isStatic
                    }"
                >
                    <th
                        v-if="isSelectable"
                        class="et-sdk-table--head-cell--selectable"
                        @click="toggleSelectAll"
                    >
                        <EtCheckbox
                            readonly
                            :checked="allChecked"
                            :indeterminate="someChecked"
                        ></EtCheckbox>
                    </th>
                    <slot
                        name="header"
                        :sorting="sorting"
                        :toggleSorting="toggleSorting"
                        :sort="sort"
                    ></slot>
                    <th class="filler"></th>
                </tr>
                <tr
                    v-if="$slots.filters && !isStatic"
                    class="et-sdk-table--filters-row"
                >
                    <th v-if="isSelectable"></th>
                    <slot
                        name="filters"
                        :filters="filters"
                        :filter="filter"
                    ></slot>
                    <th class="filler"></th>
                </tr>
            </thead>
            <tbody v-if="loading || !ready">
                <tr>
                    <td colspan="10000">
                        <div class="et-sdk-table--loading-row">
                            <EtIconSpinner pulse></EtIconSpinner>
                            <span v-if="!ready"> Preparing Table </span>
                            <span v-else> Loading </span>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-else-if="$slots.default">
                <tr
                    v-for="row in sortedRows"
                    :key="row.key"
                    class="et-sdk-table--body-row"
                    :class="{
                        'et-sdk-table--body-row__clickable': isClickable,
                        'et-sdk-table--body-row__selected':
                            selectedRows.includes(row[rowKey]),
                        // Darker row color if row is clickable & selected
                        'et-sdk-table--body-row__selected__clickable':
                            isClickable && selectedRows.includes(row[rowKey])
                    }"
                    @click="() => handleRowClick(row)"
                >
                    <td v-if="isSelectable" @click.stop="toggleRowSelect(row)">
                        <EtCheckbox
                            readonly
                            :checked="selectedRows.includes(row[rowKey])"
                        ></EtCheckbox>
                    </td>
                    <slot :row="row"></slot>
                    <td class="filler"></td>
                </tr>
            </tbody>
            <tfoot
                v-if="!isStatic && ready && !loading"
                class="et-sdk-table--footer-row"
            >
                <tr>
                    <td colspan="10000">
                        <div class="et-sdk-table--footer-content">
                            <div
                                class="et-sdk-table--footer-content--total-count"
                            >
                                <small v-if="totalRows"
                                    >Total: {{ totalRows }}</small
                                >
                            </div>
                            <div>
                                <div
                                    class="et-sdk-table--footer-content--pagination"
                                    v-if="totalRows > internalPerPage"
                                >
                                    <EtPagination
                                        v-model="currentPage"
                                        :perPage="internalPerPage"
                                        :totalRows="totalRows"
                                    ></EtPagination>
                                </div>
                            </div>
                            <div>
                                <EtInputGroup>
                                    <EtInput
                                        ref="perPageInput"
                                        :modelValue="internalPerPage"
                                        :size="UI_SIZING.XS"
                                        @enter="setPerPage"
                                    />
                                    <EtInputGroupAddon :size="UI_SIZING.XS">
                                        Per page
                                    </EtInputGroupAddon>
                                    <EtButtonSuccess
                                        :size="UI_SIZING.XS"
                                        @click="
                                            () => setPerPage(getPerPageValue())
                                        "
                                    >
                                        Set
                                    </EtButtonSuccess>
                                </EtInputGroup>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

import { Debounce } from "../../helpers/debounce";
import { sortByProperties } from "../../helpers/sort";

import EtIconSpinner from "../etIcon/EtIconSpinner.vue";
import EtPagination from "./EtPagination.vue";
import EtInputGroup from "../etForm/EtInputGroup.vue";
import EtInputGroupAddon from "../etForm/EtInputGroupAddon.vue";
import EtInput from "../etForm/EtInput.vue";
import EtCheckbox from "../etForm/EtCheckbox.vue";
import EtButtonSuccess from "../etButton/EtButtonSuccess.vue";
import type {
    DataGetterCallback,
    filter,
    ICriteria,
    IFiltering,
    ISorting,
    sortDirections
} from "../../interfaces/table";
import { EtModel } from "../../models/Model";
import { UI_SIZING } from "../../helpers/enums";

export default defineComponent({
    components: {
        EtIconSpinner,
        EtPagination,
        EtInputGroup,
        EtInputGroupAddon,
        EtInput,
        EtCheckbox,
        EtButtonSuccess
    },
    props: {
        isClickable: {
            type: Boolean,
            required: false,
            default: false
        },
        isStatic: {
            type: Boolean,
            required: false,
            default: false
        },
        isMultiSort: {
            type: Boolean,
            required: false,
            default: false
        },
        isSelectable: {
            type: Boolean,
            required: false,
            default: false
        },
        staticData: {
            type: Array as PropType<EtModel[]>,
            required: false,
            default: (): EtModel[] => []
        },
        perPage: {
            type: Number,
            required: false,
            default: 30
        },
        dataGetter: {
            type: Function as PropType<DataGetterCallback>,
            required: false,
            default: null
        },
        rowKey: {
            type: String,
            required: false,
            default: "guid"
        }
    },
    data() {
        const self: any = this;
        return {
            UI_SIZING,
            sorting: {} as ISorting,
            filters: {} as IFiltering,
            internalPerPage: this.perPage as number,
            currentPage: 1,

            loading: false,
            ready: false,

            data: [] as EtModel[],
            selectedRows: [] as string[], // keys/guids
            totalRows: 0,
            fetchDataDebounce: new Debounce(self.fetchData, 200)
        };
    },
    computed: {
        sortedRows(): EtModel[] {
            const self: any = this;
            if (!this.isStatic) {
                // If using dynamic data (from api) the sorting is already done on server side
                return this.internalRows;
            }

            return sortByProperties(self.internalRows, this.sorting);
        },
        internalRows(): EtModel[] {
            if (this.isStatic) {
                return this.staticData || [];
            }

            return this.data;
        },
        allChecked() {
            return (
                this.sortedRows.length === this.selectedRows.length &&
                this.sortedRows.length > 0
            );
        },
        someChecked() {
            return !this.allChecked && this.selectedRows.length > 0;
        }
    },
    watch: {
        sorting: {
            deep: true,
            handler: "debounceFetchData"
        },
        filters: {
            deep: true,
            handler: "debounceFetchData"
        },
        internalPerPage: "debounceFetchData",
        currentPage: "debounceFetchData",
        ready: "debounceFetchData",
        perPage() {
            this.internalPerPage = this.perPage;
        }
    },
    methods: {
        async init() {
            if (this.isStatic) {
                this.ready = true;
                return;
            }

            // do something async
            this.ready = true;
            this.selectedRows = [];
            this.data = [];
            this.debounceFetchData();
        },
        debounceFetchData() {
            this.fetchDataDebounce.debounce();
        },
        toggleSorting(field: string) {
            const currentDirection = (this.sorting[field] || "").toUpperCase();
            let newDirection: sortDirections = null;

            switch (currentDirection) {
                case "ASC":
                    newDirection = "DESC";
                    break;
                case "DESC":
                    newDirection = null;
                    break;
                default:
                    newDirection = "ASC";
                    break;
            }

            this.sort(field, newDirection);
        },
        sort(field: string, direction: sortDirections) {
            let newSortValues: ISorting = {};
            if (this.isMultiSort) {
                newSortValues = this.sorting;
            }

            newSortValues[field] = direction;
            this.sorting = newSortValues;
        },
        filter(field: string, value: filter) {
            this.filters[field] = value;
        },
        setFilters(filters: IFiltering) {
            this.filters = filters;
        },
        async fetchData() {
            if (this.isStatic) {
                return;
            }

            if (!this.ready) {
                return;
            }

            if (this.loading) {
                return;
            }

            if (!this.dataGetter) {
                return;
            }

            this.selectedRows = [];
            this.data = [];

            this.loading = true;

            const criteria: ICriteria = {
                filters: this.filters,
                sorting: this.sorting,
                page: {
                    page: this.currentPage,
                    limit: this.internalPerPage,
                    offset: (this.currentPage - 1) * this.internalPerPage
                }
            };

            const [rows, totalRows] = await this.dataGetter(criteria);

            const self: any = this;
            self.data = rows;
            self.totalRows = totalRows;
            self.loading = false;
        },
        getPerPageValue() {
            const input = this.$refs.perPageInput as any;
            return input.getValue();
        },
        setPerPage(perPage: string | number | null) {
            if (typeof perPage === "string") {
                this.internalPerPage = parseInt(perPage, 10);
            } else {
                this.internalPerPage = perPage || 30;
            }
        },
        toggleRowSelect(row: EtModel) {
            const rowKey = row[this.rowKey];
            if (!rowKey) {
                return;
            }
            this.toggleSelect(rowKey);
        },
        toggleSelect(rowKey: string) {
            const isSelected = this.selectedRows.includes(rowKey);
            if (isSelected) {
                this.selectedRows = this.selectedRows.filter(
                    (key) => key !== rowKey
                );
            } else {
                this.selectedRows.push(rowKey);
            }

            this.$emit("onRowSelect", this.selectedRows);
        },
        toggleSelectAll() {
            if (this.someChecked || this.selectedRows.length <= 0) {
                this.selectedRows = this.sortedRows
                    .map((row: EtModel) => row[this.rowKey])
                    .filter((v) => !!v);
            } else {
                this.selectedRows = [];
            }

            this.$emit("onRowSelect", this.selectedRows);
        },
        handleRowClick(row: EtModel) {
            if (this.isSelectable && this.selectedRows.length > 0) {
                this.toggleRowSelect(row);
                return;
            }

            if (!this.isClickable) {
                return;
            }

            this.$emit("onRowClick", row);
        }
    },
    async mounted() {
        await this.init();
    },
    emits: ["onRowSelect", "onRowClick"]
});
</script>

<style>
.et-sdk-table-wrapper .filler {
    max-width: 100%;
}

.et-sdk-table-wrapper {
    overflow-y: auto;
    height: 100%;
    scrollbar-width: none;
}

.et-sdk-table-wrapper::webkit-scrollbar {
    display: none;
}

.et-sdk-table {
    width: 100%;
}

.et-sdk-table--head {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--et-sdk-light-0);
}

.et-sdk-table--head-row {
    text-align: left;
}

.et-sdk-table--head-row th:not(.filler) {
    padding: 8px;
    color: var(--et-sdk-dark-400);

    font-size: var(--et-sdk-font-size-small);
    line-height: 16px;
    font-weight: var(--et-sdk-font-weight-semibold);
}

.et-sdk-table--head-row__no-filters {
    border-bottom: 1px solid var(--et-sdk-dark-200);
}

.et-sdk-table--head-cell--selectable {
    width: 5px;
}

.et-sdk-table--filters-row {
    border-bottom: 1px solid var(--et-sdk-dark-200);
}

.et-sdk-table--filters-row td:not(.filler) {
    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 4px;
}

.et-sdk-table--loading-row {
    width: 100%;
    max-width: 100vw;
    text-align: center;
    font-size: var(--et-sdk-font-size-extra-large);
    line-height: 28px;
    padding: 16px;
}

.et-sdk-table--body-row {
    border-bottom: 1px solid var(--et-sdk-dark-200);
    transition: all 150ms ease-in-out;
}

.et-sdk-table--body-row td:not(.filler) {
    padding: 8px;
}

.et-sdk-table--body-row__clickable:hover {
    cursor: pointer;
    background-color: var(--et-sdk-dark-100);
}

.et-sdk-table--body-row__selected {
    background-color: var(--et-sdk-blue-300);
}

.et-sdk-table--body-row__selected__clickable:hover {
    background-color: var(--et-sdk-blue-400);
}

.et-sdk-table--footer-row {
    border-top: 1px solid var(--et-sdk-dark-200);
    position: sticky;
    bottom: 0;
    z-index: 10;
    background-color: var(--et-sdk-light-0);
}

.et-sdk-table--footer-content {
    display: grid;
    gap: 16px;
    grid-template-columns: 240px auto 240px;
}

.et-sdk-table--footer-content > div {
    padding: 4px;
}

.et-sdk-table--footer-content--pagination {
    margin: 0 auto;
    width: 200px;
}

.et-sdk-table--footer-content--total-count {
    color: var(--et-sdk-dark-300);
}
</style>
