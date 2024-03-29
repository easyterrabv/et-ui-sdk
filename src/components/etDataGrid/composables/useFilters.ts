import { reactive } from "vue";

import type {
    BaseFilterDefinition,
    FilterDefinition,
    FilterObject,
    FiltersProvide
} from "../interfaces/DataGridFilters";
import type { RowObject } from "../interfaces/DataRowObject";

export function useFilters<T extends RowObject = RowObject>(
    filtersDefinitionsGetter: () => FilterDefinition[]
) {
    return reactive<FiltersProvide>({
        filtersValues: {},

        setFilters(newFilters: FilterObject) {
            this.filtersValues = Object.entries(newFilters).reduce(
                (prev: FilterObject, [key, value]) => {
                    if (value !== null && value !== undefined) {
                        prev[key] = value;
                    }
                    return prev;
                },
                {}
            );
        },
        setFilter(field, value) {
            const filters = JSON.parse(JSON.stringify(this.filtersValues));

            if (value === null || value === undefined) {
                delete filters[field];
            } else {
                filters[field] = value;
            }

            this.setFilters(filters);
        },
        getFilter(field) {
            return this.filtersValues[field] ?? null;
        },
        clearFilters() {
            this.setFilters({});
        },
        reset() {
            const newFilters: FilterObject = {};
            const filterDefinitions = this.getFiltersDefinitions();

            filterDefinitions.forEach((filterDefinition: FilterDefinition) => {
                if (!filterDefinition) {
                    return;
                }

                const { field, default: defaultValue } =
                    filterDefinition as BaseFilterDefinition;

                if (defaultValue) {
                    newFilters[field] = defaultValue;
                }
            });

            this.setFilters(newFilters);
        },

        getFiltersDefinitions() {
            return filtersDefinitionsGetter();
        },
        hasFilters() {
            const filterDefinitions = this.getFiltersDefinitions();
            return filterDefinitions.length > 0;
        }
    });
}
