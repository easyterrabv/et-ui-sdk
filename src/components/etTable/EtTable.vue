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
                        '[&_th:not(.filler)]:px-4 text-left',
                        {
                            '[&_th:not(.filler)]:py-2': !(
                                $slots.filters && !isStatic
                            ),
                            '[&_th:not(.filler)]:pt-2':
                                $slots.filters && !isStatic
                        }
                    ]"
                >
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
                        '[&_td:not(.filler)]:px-4 [&_td:not(.filler)]:pb-2' // default <td> styling
                    ]"
                >
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
                            class="w-full max-w-screen text-center text-2xl p-8"
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
                        '[&_td:not(.filler)]:px-4 [&_td:not(.filler)]:py-2', // default <td> styling
                        'transition-all ease-in-out duration-150', // animations
                        {
                            'hover:bg-default-extra-light cursor-pointer':
                                isClickable // row hovers
                        }
                    ]"
                >
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
                            <div class="p-2 w-60 text-default-light">
                                <small v-if="totalRows"
                                    >Total: {{ totalRows }}</small
                                >
                            </div>
                            <div class="flex-grow p-2">
                                <div class="flex justify-center">
                                    <EtPagination
                                        v-model="currentPage"
                                        :perPage="internalPerPage"
                                        :totalRows="totalRows"
                                    ></EtPagination>
                                </div>
                            </div>
                            <div class="p-2 w-60">
                                <EtInputGroup>
                                    <EtInput
                                        ref="perPageInput"
                                        :modelValue="internalPerPage"
                                        size="s"
                                        wrapperClasses="!w-24"
                                        @enter="setPerPage"
                                    />
                                    <EtInputGroupAddon size="s">
                                        Per page
                                    </EtInputGroupAddon>
                                    <EtButtonSuccess
                                        size="s"
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
import EtButtonSuccess from "src/components/etButton/EtButtonSuccess.vue";

export default defineComponent({
    components: {
        EtIconSpinner,
        EtPagination,
        EtInputGroup,
        EtInputGroupAddon,
        EtInput,
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
        }
    },
    async mounted() {
        await this.init();
    }
});
</script>
