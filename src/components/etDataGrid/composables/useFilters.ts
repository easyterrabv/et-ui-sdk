import { reactive } from "vue";
import type {
    FilterDefinition,
    FilterObject,
    FiltersProvide,
    RowObject
} from "../interfaces/DataGridMethods";

export function useFilters<T extends RowObject = RowObject>(
    filters: FilterDefinition[]
) {
    return reactive<FiltersProvide>({
        filters: {},

        setFilters(newFilters: FilterObject) {
            this.filters = newFilters;
        },
        setFilter(field, value) {
            this.filters[field] = value;
        },
        getFilter(field) {
            return this.filters[field] || null;
        },
        clearFilters() {
            this.setFilters({});
        },
        reset() {
            const newFilters: FilterObject = {};

            filters.forEach((filter) => {
                if (!filter) {
                    return;
                }

                const { field, default: defaultValue } = filter;

                if (defaultValue) {
                    newFilters[field] = defaultValue;
                }
            });

            this.setFilters(newFilters);
        }
    });
}
