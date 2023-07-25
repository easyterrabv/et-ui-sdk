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
                            'hover:bg-default-extra-light cursor-pointer':
                                isClickable, // row hover
                            'bg-primary-extra-light': selectedRows.includes(
                                row[rowKey]
                            )
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
                                        size="xs"
                                        wrapperClasses="!w-24"
                                        @enter="setPerPage"
                                    />
                                    <EtInputGroupAddon size="xs">
                                        Per page
                                    </EtInputGroupAddon>
                                    <EtButtonSuccess
                                        size="xs"
                                        @click="
                                            (e) =>
                                                setPerPage(
                                                    $refs.perPageInput.getValue()
                                                )
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

<script>
import { defineComponent } from "vue";

import { Debounce } from "src/helpers/debounce";
import { sortByProperties } from "src/helpers/sort";

import EtIconSpinner from "src/components/etIcon/EtIconSpinner.vue";
import EtPagination from "src/components/etTable/EtPagination.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";
import EtInputGroupAddon from "src/components/etForm/EtInputGroupAddon.vue";
import EtInput from "src/components/etForm/EtInput.vue";
import EtCheckbox from "src/components/etForm/EtCheckbox.vue";
import EtButtonSuccess from "src/components/etButton/EtButtonSuccess.vue";

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
            type: Array,
            required: false,
            default: () => []
        },
        perPage: {
            type: Number,
            required: false,
            default: 30
        },
        dataGetter: {
            type: Function,
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
        return {
            sorting: {},
            filters: {},
            internalPerPage: this.perPage,
            currentPage: 1,

            loading: false,
            ready: false,

            data: [],
            selectedRows: [],
            totalRows: 0,
            debouncerFetchData: new Debounce(this.fetchData, 200)
        };
    },
    computed: {
        sortedRows() {
            if (!this.isStatic) {
                // If using dynamic data (from api) the sorting is already done on server side
                return this.internalRows;
            }

            return sortByProperties(this.internalRows, this.sorting);
        },
        internalRows() {
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
        toggleSorting(field) {
            const currentDirection = (this.sorting[field] || "").toUpperCase();
            let newDirection = null;

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
        sort(field, direction) {
            let newSortValues = {};
            if (this.isMultiSort) {
                newSortValues = this.sorting;
            }

            newSortValues[field] = direction;
            this.sorting = newSortValues;
        },
        filter(field, value) {
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
            const [rows, totalRows] = await this.dataGetter({
                filters: this.filters,
                sorting: this.sorting,
                page: this.currentPage,
                perPage: this.internalPerPage,
                offset: (this.currentPage - 1) * this.internalPerPage
            });

            this.data = rows;
            this.totalRows = totalRows;
            this.loading = false;
        },
        setPerPage(perPage) {
            this.internalPerPage = parseInt(perPage, 10);
        },
        toggleRowSelect(row) {
            const rowKey = row[this.rowKey];
            if (!rowKey) {
                return;
            }
            this.toggleSelect(rowKey);
        },
        toggleSelect(rowKey) {
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
                    .map((row) => row[this.rowKey])
                    .filter((v) => !!v);
            } else {
                this.selectedRows = [];
            }

            this.$emit("onRowSelect", this.selectedRows);
        },
        handleRowClick(row) {
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
