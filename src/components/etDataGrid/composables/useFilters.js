import { reactive } from "vue";
export function useFilters(filtersDefinitionsGetter) {
    return reactive({
        filtersValues: {},
        setFilters(newFilters) {
            this.filtersValues = Object.entries(newFilters).reduce((prev, [key, value]) => {
                if (value !== null && value !== undefined) {
                    prev[key] = value;
                }
                return prev;
            }, {});
        },
        setFilter(field, value) {
            if (value === null || value === undefined) {
                delete this.filtersValues[field];
            }
            else {
                this.filtersValues[field] = value;
            }
        },
        getFilter(field) {
            return this.filtersValues[field] ?? null;
        },
        clearFilters() {
            this.setFilters({});
        },
        reset() {
            const newFilters = {};
            const filterDefinitions = this.getFiltersDefinitions();
            filterDefinitions.forEach((filterDefinition) => {
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
            const filterDefinitions = this.getFiltersDefinitions();
            return filterDefinitions.length > 0;
        }
    });
}
