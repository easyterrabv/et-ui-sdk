import { reactive, type UnwrapNestedRefs } from "vue";
import type { IDataGridCriteria } from "../interfaces/DataGridCriteria";
import type { IUseUrlData, urlDataObject } from "./useUrlData";
import type { FilterValue } from "../interfaces/DataGridFilters";

export interface ICriteriaManager {
    criteria: IDataGridCriteria;
    setCriteria: (criteria: IDataGridCriteria) => Promise<void>;
    setSorting: (sorting: IDataGridCriteria["sorting"]) => Promise<void>;
    setFilters: (filters: IDataGridCriteria["filters"]) => Promise<void>;
    setFilter: (field: string, value: FilterValue) => Promise<void>;
    setPage: (page: number) => Promise<void>;
    setPerPage: (perPage: number) => Promise<void>;
}

const _defaultCriteria = {
    sorting: {},
    filters: {},
    page: 1,
    perPage: 30
};

export function useCriteriaManager(
    useUrlData:
        | UnwrapNestedRefs<IUseUrlData<IDataGridCriteria>>
        | undefined = undefined,
    loadFromUrl = true,
    saveToUrl = true,

    defaultCriteria: IDataGridCriteria = _defaultCriteria,
    // Will only be used at the load/start from this manager. Otherwise, will reference to default values
    startingCriteria: IDataGridCriteria = defaultCriteria
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
                sorting: sorting || defaultCriteria.sorting
            });
        },
        async setFilters(filters) {
            await this.setCriteria({
                ...this.criteria,
                filters: filters || defaultCriteria.filters
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
                page: page || defaultCriteria.page
            });
        },
        async setPerPage(perPage) {
            await this.setCriteria({
                ...this.criteria,
                perPage: perPage || defaultCriteria.perPage
            });
        }
    });
}
