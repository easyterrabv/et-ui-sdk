import type { DataGridColumn } from "./DataGridColumn";
import type { Raw } from "@vue/reactivity";

export type RowObject = { [key: string]: any };

export interface BulkMethod<T extends RowObject = RowObject> {
    method: (rows: T[]) => Promise<void>;
    component?: Raw<object>; // Icon object
    title?: string;
}

export interface CheckedProvide<T extends RowObject = RowObject> {
    rows: T[];

    select: (row: T) => void;
    unSelect: (needle: T) => void;
    isSelected: (needle: T) => boolean;
    toggle: (row: T) => void;

    selectAll: () => void;
    unSelectAll: () => void;
    allSelected: () => boolean;
    // any selected means: At least one, but could also be all of them;
    anySelected: () => boolean;
    // SOME !== all. so only return true if there is at least one selected but not all
    someSelected: () => boolean;
    toggleAll: () => void;

    reset: () => void;
}

export type SortingObject = { [key: string]: sortDirections };
export type sortDirections = "ASC" | "DESC" | null;

export interface SortingProvide<T extends RowObject = RowObject> {
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

export type FilterValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | FilterObject[]
    | FilterObject;

export type FilterObject = {
    [field: string]: FilterValue;
};

export interface FiltersProvide {
    filters: FilterObject;

    setFilters: (filters: FilterObject) => void;

    setFilter: (field: string, value: FilterValue) => void;
    getFilter: (field: string) => FilterValue;

    clearFilters: () => void;
    reset: () => void;
}

export interface PaginationProvide {
    page: number;
    perPage: number;

    totalRows: number;
}

export interface CellWidthProvide<T extends RowObject = RowObject> {
    growCells: number;
    maxGrowCellWidth: number | null;

    calculateGrowCells: (columns: DataGridColumn<T>[]) => void;
    calculateMaxWidth: (
        tableWidth: number,
        columns: DataGridColumn<T>[],
        isSelectable: boolean
    ) => void;
    calculate: (
        tableWidth: number,
        columns: DataGridColumn<T>[],
        isSelectable: boolean
    ) => void;
}

export interface RowVersionProvider<T extends RowObject = RowObject> {
    versions: Record<string, number>;
    reset: (rows: T[]) => void;
    increment: (row: T) => void;
}
