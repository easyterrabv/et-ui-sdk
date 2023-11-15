import type { DataGridColumn } from "./DataGridColumn";

export interface CheckedProvide<T = object> {
    rows: T[];

    select: (row: T) => void;
    unSelect: (needle: T) => void;
    isSelected: (needle: T) => boolean;
    toggle: (row: T) => void;

    selectAll: () => void;
    unSelectAll: () => void;
    allSelected: () => boolean;
    anySelected: () => boolean;
    someSelected: () => boolean;
    toggleAll: () => void;

    reset: () => void;
}

export type SortingObject = { [key: string]: sortDirections };
export type sortDirections = "ASC" | "DESC" | null;

export interface SortingProvide<T = object> {
    isMultiSorting: boolean;
    sorting: SortingObject;
    getField: (column: DataGridColumn<T>) => string | null;
    setSorting: (column: DataGridColumn<T>, direction: sortDirections) => void;
    toggleSorting: (column: DataGridColumn<T>) => void;
    clearSorting: () => void;
    reset: (columns: DataGridColumn<T>[]) => void;

    isSortable: (column: DataGridColumn<T>) => boolean;
    getSorting: (column: DataGridColumn<T>) => sortDirections;
}
