import { reactive, type UnwrapNestedRefs } from "vue";
import type { IDataGridCriteria } from "../interfaces/DataGridCriteria";
import type { IUseUrlData, urlDataObject } from "./useUrlData";
import type { FilterValue } from "../interfaces/DataGridFilters";
import type { sortDirections } from "../interfaces/DataGridMethods";
import type { DataGridColumn } from "../interfaces/DataGridColumn";

export interface ICriteriaManager {
    criteria: IDataGridCriteria;
    setCriteria: (criteria: IDataGridCriteria) => Promise<void>;
    setSorting: (sorting: IDataGridCriteria["sorting"]) => Promise<void>;
    setSortingByColumn: (
        column: DataGridColumn,
        direction: sortDirections
    ) => Promise<void>;
    setFilters: (filters: IDataGridCriteria["filters"]) => Promise<void>;
    setFilter: (field: string, value: FilterValue) => Promise<void>;
    setPage: (page: number) => Promise<void>;
    setPerPage: (perPage: number) => Promise<void>;

    getSortField: (column: DataGridColumn) => string | null;
    toggleSorting: (column: DataGridColumn) => Promise<void>;
    isColumnSortable: (column: DataGridColumn) => boolean;
    getColumnSortDirection: (column: DataGridColumn) => sortDirections;
    resetSorting: (columns: DataGridColumn[]) => Promise<void>;
}

const _defaultCriteria = {
    sorting: {},
    filters: {},
    page: 1,
    perPage: 30
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
              : defaultCriteria,
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
            await this.setCriteria({
                ...this.criteria,
                page: page || defaultCriteria?.page || _defaultCriteria.page
            });
        },
        async setPerPage(perPage) {
            await this.setCriteria({
                ...this.criteria,
                perPage:
                    perPage ||
                    defaultCriteria?.perPage ||
                    _defaultCriteria.perPage
            });
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
