<template>
    <div class="overflow-y-auto h-full scrollbar-none">
        <table class="w-full">
            <thead
                v-if="$slots.header || ($slots.filters && !isStatic)"
                :class="[
                    'border-b-2 border-default-light',
                    'sticky top-0 z-10 bg-white'
                ]"
            >
                <tr
                    v-if="$slots.header"
                    :class="[
                        '[&_th:not(.filler)]:px-1 text-left', // this styles the <th> elements
                        {
                            '[&_th:not(.filler)]:py-1': !(
                                $slots.filters && !isStatic
                            ),
                            '[&_th:not(.filler)]:pt-1':
                                $slots.filters && !isStatic
                        }
                    ]"
                >
                    <th
                        v-if="isSelectable"
                        class="w-2"
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
                    <th class="filler max-w-full"></th>
                </tr>
                <tr
                    v-if="$slots.filters && !isStatic"
                    :class="[
                        '[&_td:not(.filler)]:px-2 [&_td:not(.filler)]:pb-1' // default <td> styling
                    ]"
                >
                    <th v-if="isSelectable"></th>
                    <slot
                        name="filters"
                        :filters="filters"
                        :filter="filter"
                    ></slot>
                    <th class="filler max-w-full"></th>
                </tr>
            </thead>
            <tbody v-if="loading || !ready">
                <tr>
                    <td colspan="10000">
                        <div
                            class="w-full max-w-screen text-center text-2xl p-4"
                        >
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
                    :class="[
                        'border-b-2 border-default-extra-light', // default styling
                        '[&_td:not(.filler)]:p-1', // default <td> styling
                        'transition-all ease-in-out duration-150', // animations
                        {
                            // Hover is row is clickable
                            'hover:bg-default-extra-light cursor-pointer':
                                isClickable,
                            // Darker hover is row is clickable & striped rows is used
                            'hover:bg-default-medium-light':
                                isClickable && isStriped,
                            // Row color when row is selected
                            '!bg-primary-extra-light': selectedRows.includes(
                                row[rowKey]
                            ),
                            // Darker row color if row is clickable & selected
                            'hover:!bg-primary-light':
                                isClickable &&
                                selectedRows.includes(row[rowKey]),
                            // darker row color for odd rows when table is striped.
                            'odd:bg-default-extra-light': isStriped
                        }
                    ]"
                    @click="() => handleRowClick(row)"
                >
                    <td v-if="isSelectable" @click.stop="toggleRowSelect(row)">
                        <EtCheckbox
                            readonly
                            :checked="selectedRows.includes(row[rowKey])"
                        ></EtCheckbox>
                    </td>
                    <slot :row="row"></slot>
                    <td class="filler max-w-full"></td>
                </tr>
            </tbody>
            <tfoot
                v-if="!isStatic && ready && !loading"
                :class="[
                    'border-t-2 border-default-light',
                    'sticky bottom-0 z-10 bg-white'
                ]"
            >
                <tr>
                    <td colspan="10000">
                        <div class="flex flex-row">
                            <div class="p-1 w-60 text-default-light">
                                <small v-if="totalRows"
                                    >Total: {{ totalRows }}</small
                                >
                            </div>
                            <div class="flex-grow p-1">
                                <div class="flex justify-center">
                                    <EtPagination
                                        v-model="currentPage"
                                        :perPage="internalPerPage"
                                        :totalRows="totalRows"
                                    ></EtPagination>
                                </div>
                            </div>
                            <div class="p-1 w-60">
                                <EtInputGroup>
                                    <EtInput
                                        ref="perPageInput"
                                        :modelValue="internalPerPage"
                                        :size="UI_SIZING.XS"
                                        wrapperClasses="!w-24"
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
import { UI_SIZING } from "../../enums";

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
        isStriped: {
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
            debouncerFetchData: new Debounce(self.fetchData, 200)
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
            this.debouncerFetchData.debounce();
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
                page: this.currentPage,
                limit: this.internalPerPage,
                offset: (this.currentPage - 1) * this.internalPerPage
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
