import type { DataGridColumn } from "./DataGridColumn";
import type { Raw } from "@vue/reactivity";
import { type IOption, OptionModel } from "../../../models/Option";

export type RowObject<T extends object = { [key: string]: any }> = T;

export interface BulkMethod<T extends RowObject = RowObject> {
    method: (rows: T[]) => Promise<void>;
    component?: Raw<object>; // Icon object
    title?: string;
}

export enum FilterInputType {
    INPUT,
    CHECKBOX,
    SELECT,
    DATERANGE
}

export type OptionFilterValue = {
    value: string | boolean | number | Date;
    label: string | null;
};

export type FilterDateValue = [Date | null, Date | null];

export type FilterValue =
    | string
    | number
    | boolean
    | null
    | undefined
    | OptionFilterValue[]
    | FilterDateValue;

export type BaseFilterDefinition<T = FilterInputType> = {
    field: string;
    label?: string;
    default?: FilterValue;
    validator?: (value: FilterValue) => boolean;
    formatter?: (value: FilterValue) => any;
    type: T;
};

export type SelectFilterDefinition<T = FilterInputType.SELECT> =
    BaseFilterDefinition<T> & {
        options: OptionModel[] | (() => Promise<OptionModel[]>);
        multiple: boolean;
    };

export type DateFilterDefinition<T = FilterInputType.DATERANGE> = Omit<
    BaseFilterDefinition<T>,
    "default"
> & {
    defaultStart?: string | Date;
    defaultEnd?: string | Date;
};

export type FilterTypeMapping<T> = {
    [FilterInputType.SELECT]: SelectFilterDefinition<T>;
    [FilterInputType.DATERANGE]: DateFilterDefinition<T>;
};

export type FilterDefinition<T extends FilterInputType = FilterInputType> =
    T extends keyof FilterTypeMapping<T>
        ? FilterTypeMapping<T>[T]
        : BaseFilterDefinition<T>;

export interface FilterDisplay {
    field: string;
    value: FilterValue;
    label: string;
    definition: FilterDefinition;
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

export type FilterObject = {
    [field: string]: FilterValue;
};

export interface FiltersProvide {
    filtersValues: FilterObject;

    setFilters: (filters: FilterObject) => void;

    setFilter: (field: string, value: FilterValue) => void;
    getFilter: (field: string) => FilterValue;

    clearFilters: () => void;
    reset: () => void;

    getFiltersDefinitions: () => FilterDefinition[];
    hasFilters: () => boolean;
}

export type FiltersStagingProvide = Pick<
    FiltersProvide,
    "filtersValues" | "setFilter" | "getFilter"
>;

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
