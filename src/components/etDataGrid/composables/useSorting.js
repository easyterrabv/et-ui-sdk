import { reactive } from "vue";
export function useSorting(isMultiSorting = false) {
    return reactive({
        isMultiSorting,
        sorting: {},
        getField(column) {
            if (!this.isSortable(column)) {
                return null;
            }
            const header = column.header || undefined;
            const sorting = header?.sorting || undefined;
            if (!sorting) {
                return null;
            }
            return sorting.field;
        },
        setSorting(column, direction) {
            const field = this.getField(column);
            if (!field) {
                return;
            }
            if (!this.isMultiSorting) {
                this.clearSorting();
            }
            if (!direction) {
                delete this.sorting[field];
            }
            else {
                this.sorting[field] = direction;
            }
        },
        toggleSorting(column) {
            const field = this.getField(column);
            if (!field) {
                return;
            }
            const sortOrder = ["ASC", "DESC", null];
            const currentSort = this.sorting[field] || null;
            const currentSortIndex = sortOrder.indexOf(currentSort);
            let nextSortIndex = currentSortIndex + 1;
            if (nextSortIndex >= sortOrder.length || nextSortIndex < 0)
                nextSortIndex = 0;
            this.setSorting(column, sortOrder[nextSortIndex] || null);
        },
        clearSorting() {
            this.sorting = {};
        },
        reset(columns) {
            const newSorting = {};
            columns.forEach((column) => {
                if (!this.isSortable(column)) {
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
            this.sorting = newSorting;
        },
        isSortable(column) {
            const header = column.header || undefined;
            return !!header?.sorting;
        },
        getSorting(column) {
            const field = this.getField(column);
            if (!field) {
                return null;
            }
            return this.sorting[field] || null;
        }
    });
}
