import { reactive } from "vue";
import type {
    FilterDefinition,
    FilterObject,
    FiltersProvide,
    RowObject
} from "../interfaces/DataGridMethods";

export function useFilters<T extends RowObject = RowObject>(
    filtersDefinitionsGetter: () => FilterDefinition[]
) {
    return reactive<FiltersProvide>({
        filtersValues: {},

        setFilters(newFilters: FilterObject) {
            this.filtersValues = newFilters;
        },
        setFilter(field, value) {
            this.filtersValues[field] = value;
        },
        getFilter(field) {
            return this.filtersValues[field] || null;
        },
        clearFilters() {
            this.setFilters({});
        },
        reset() {
            const newFilters: FilterObject = {};
            const filterDefinitions = this.getFiltersDefinitions() || [];

            filterDefinitions.forEach((filterDefinition: FilterDefinition) => {
                if (!filterDefinition) {
                    return;
                }

                const { field, default: defaultValue } = filterDefinition;

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
            const filterDefinitions = this.getFiltersDefinitions() || [];
            return filterDefinitions.length > 0;
        }
    });
}
