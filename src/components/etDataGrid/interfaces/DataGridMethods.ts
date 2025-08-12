import type { DataGridColumn } from "./DataGridColumn";
import type { Raw } from "vue";
import type { RowObject } from "./DataRowObject";

export interface BulkMethod<T extends RowObject = RowObject> {
    method: (rows: T[]) => Promise<void> | void;
    component?: Raw<object>; // object
    title?: string | ((rows: T[]) => string);
    isVisible?: boolean | ((rows: T[]) => boolean);
    meta?: { [key: string]: any };
    rowsAsProp?: boolean;
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
