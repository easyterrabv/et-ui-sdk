import { reactive } from "vue";
import type {
    FilterObject,
    FiltersProvide
} from "../interfaces/DataGridMethods";
import type { DataGridColumn } from "../interfaces/DataGridColumn";
import type { RowObject } from "../interfaces/DataGridMethods";

export function useFilters<T extends RowObject = RowObject>(
    columns: DataGridColumn<T>[]
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

            columns.forEach((column) => {
                const header = column.header;
                const filter = header?.filter;
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
