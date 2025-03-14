import { reactive, type UnwrapNestedRefs } from "vue";
import type { IDataGridCriteria } from "../interfaces/DataGridCriteria";
import type { IUseUrlData, urlDataObject } from "./useUrlData";
import type { FilterValue } from "../interfaces/DataGridFilters";
import type { sortDirections } from "../interfaces/DataGridMethods";
import type { DataGridColumn } from "../interfaces/DataGridColumn";

export interface ICriteriaManager {
    criteria: IDataGridCriteria;
    totalRows: number;
    setCriteria: (criteria: IDataGridCriteria) => Promise<void> | void;
    setSorting: (sorting: IDataGridCriteria["sorting"]) => Promise<void> | void;
    setSortingByColumn: (
        column: DataGridColumn,
        direction: sortDirections
    ) => Promise<void> | void;
    setFilters: (filters: IDataGridCriteria["filters"]) => Promise<void> | void;
    setFilter: (field: string, value: FilterValue) => Promise<void> | void;
    setPage: (page: number) => Promise<void> | void;
    setPerPage: (perPage: number) => Promise<void> | void;

    getSortField: (column: DataGridColumn) => string | null;
    toggleSorting: (column: DataGridColumn) => Promise<void> | void;
    isColumnSortable: (column: DataGridColumn) => boolean;
    getColumnSortDirection: (column: DataGridColumn) => sortDirections;
    resetSorting: (columns: DataGridColumn[]) => Promise<void> | void;
}

const _defaultCriteria = {
    sorting: {},
    filters: {},
    page: 1,
    perPage: 50
};

export interface IUseCriteriaManager {
    useUrlData?: UnwrapNestedRefs<IUseUrlData<IDataGridCriteria>>;
    loadFromUrl?: boolean;
    saveToUrl?: boolean;
    defaultCriteria?: IDataGridCriteria;
    startingCriteria?: IDataGridCriteria;
    isMultiSorting?: boolean;
}

export function useCriteriaManager(
    {
        useUrlData,
        loadFromUrl,
        saveToUrl,
        defaultCriteria,
        startingCriteria,
        isMultiSorting
    }: IUseCriteriaManager = {
        useUrlData: undefined,
        loadFromUrl: true,
        saveToUrl: true,
        defaultCriteria: _defaultCriteria,
        startingCriteria: _defaultCriteria,
        isMultiSorting: false
    }
) {
    let urlCriteria = null;

    if (useUrlData && loadFromUrl) {
        const urlData = useUrlData.getDataFromUrl();
        if (urlData) {
            urlCriteria = JSON.parse(JSON.stringify(urlData));
        }
    }

    return reactive<ICriteriaManager>({
        criteria: urlCriteria
            ? urlCriteria
            : startingCriteria
              ? startingCriteria
              : defaultCriteria
                ? defaultCriteria
                : _defaultCriteria,
        totalRows: 0,
        async setCriteria(criteria) {
            this.criteria = criteria;
            if (useUrlData && saveToUrl) {
                await useUrlData.setDataToUrl(
                    criteria as unknown as urlDataObject
                );
            }
        },
        async setSorting(sorting) {
            await this.setCriteria({
                ...this.criteria,
                sorting:
                    sorting ||
                    defaultCriteria?.sorting ||
                    _defaultCriteria.sorting
            });
        },
        async setSortingByColumn(column, direction) {
            const field = this.getSortField(column);

            if (!field) {
                return;
            }

            let newSorting = {
                ...this.criteria.sorting
            };

            if (!isMultiSorting) {
                newSorting = {};
            }

            if (!direction) {
                delete newSorting[field];
            } else {
                newSorting[field] = direction;
            }

            await this.setSorting(newSorting);
        },
        async setFilters(filters) {
            await this.setCriteria({
                ...this.criteria,
                page: 1,
                filters:
                    filters ||
                    defaultCriteria?.filters ||
                    _defaultCriteria.filters
            });
        },
        async setFilter(field, value) {
            const filters = JSON.parse(JSON.stringify(this.criteria.filters));

            if (value === null || value === undefined) {
                delete filters[field];
            } else {
                filters[field] = value;
            }

            await this.setFilters(filters);
        },
        async setPage(page) {
            this.criteria.page =
                page || defaultCriteria?.page || _defaultCriteria.page;

            if (useUrlData && saveToUrl) {
                await useUrlData.setDataToUrl(
                    this.criteria as unknown as urlDataObject
                );
            }
        },
        async setPerPage(perPage) {
            this.criteria.perPage =
                perPage || defaultCriteria?.perPage || _defaultCriteria.perPage;

            if (useUrlData && saveToUrl) {
                await useUrlData.setDataToUrl(
                    this.criteria as unknown as urlDataObject
                );
            }
        },

        getSortField(column) {
            if (!this.isColumnSortable(column)) {
                return null;
            }

            const header = column.header || undefined;
            const sorting = header?.sorting || undefined;

            if (!sorting) {
                return null;
            }

            return sorting.field;
        },
        async toggleSorting(column) {
            const field = this.getSortField(column);

            if (!field) {
                return;
            }

            const sortOrder: sortDirections[] = ["ASC", "DESC", null];
            const currentSort = this.criteria.sorting[field] || null;
            const currentSortIndex = sortOrder.indexOf(currentSort);
            let nextSortIndex = currentSortIndex + 1;
            if (nextSortIndex >= sortOrder.length || nextSortIndex < 0)
                nextSortIndex = 0;

            await this.setSortingByColumn(
                column,
                sortOrder[nextSortIndex] || null
            );
        },
        isColumnSortable(column) {
            const header = column.header || undefined;
            return !!header?.sorting;
        },
        getColumnSortDirection(column) {
            const field = this.getSortField(column);
            if (!field) {
                return null;
            }
            return this.criteria.sorting[field] || null;
        },
        async resetSorting(columns) {
            const newSorting: { [field: string]: sortDirections } = {};
            columns.forEach((column) => {
                if (!this.isColumnSortable(column)) {
                    return;
                }

                const header = column.header || undefined;
                const sorting = header?.sorting || undefined;
                const defaultDirection = sorting?.default || undefined;

                if (!defaultDirection || !sorting) {
                    return;
                }

                newSorting[sorting.field] = defaultDirection;
            });

            await this.setSorting(newSorting);
        }
    });
}
