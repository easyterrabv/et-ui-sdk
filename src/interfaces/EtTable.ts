import type { IOption } from "../models/Option";

export type FilterGenerics = string | number | boolean;
export type TableCriteriaItem =
    | FilterGenerics
    | FilterGenerics[]
    | TableCriteria;

export type DateGetterCallback<T = object> = (
    criteria: TableCriteria
) => Promise<[T[], number]>;

export enum TableColumnStyling {
    AUTOEUROPE = "AUTOEUROPE",
    RENTALCARS = "RENTALCARS",
    CARNECT = "CARNECT",
    OFFUGO = "OFFUGO",
    EDITABLE = "EDITABLE",
    DEFAULT = "DEFAULT"
}

export interface TableCriteria {
    [key: string]: TableCriteriaItem;
}

export interface TableBasicFilter<I = object, M = object> {
    field: string;
    label?: string;
    component?: string;
    defaultValue?: FilterGenerics;
    multiple?: boolean;
    type?: "regular" | "minmax" | "period";
    info?: I;
    meta?: M;
}

export interface TableEditableCell<T = object> {
    component?: string;
    options?: IOption[];
    multiselect?: boolean;
    editable?: boolean | ((data: unknown, rows: T[]) => boolean);
}

export interface TableColumnSorting {
    field: string;
    type?: string;
    level?: string;
    onClick?: () => Promise<string>;
}

export interface TableColumnFilter extends TableBasicFilter {
    clickToFilter?: boolean;
    clickToFilterByWord?: boolean;
}

export interface TableBulkAction<T = object> {
    label: string;
    method: (rows: T[]) => Promise<void>;
    name?: string;
    disabled?: boolean | ((rows: T[]) => Promise<boolean>);
}

export interface TableColumnBulkEdit<T = object> {
    defaultMethod?: string;
    methods: TableBulkAction<T>[];
}

export interface TableColumnInfo<T = object, M = object> {
    label: string;
    name: string;
    width?: number;
    valueKey?: string;
    formatter?: (data: unknown, rows: T[], fullData?: any) => string;
    useArrayMode?: boolean;
    filter?: TableColumnFilter;
    rawValueGetter?: (data: unknown, rows: T[], fullData?: any) => unknown;
    bulkEditMethods?: TableColumnBulkEdit<T>;
    styleOption?:
        | TableColumnStyling
        | ((data: unknown, rows: T[]) => TableColumnStyling);
    defaultVisible?: boolean;
    editable?: TableEditableCell;
    onEditCallback?: () => unknown;
    cellCallback?: (value: string, row: T) => unknown;
    sorting?: TableColumnSorting;
    renderRaw?: boolean;
    cellCss?: { [key: string]: string };
    cellMeta?: M;
}

export interface TableInfo<T = object> {
    name: string;
    dataGetter?: DateGetterCallback<T>;
    staticData?: DateGetterCallback<T> | T[];
    saveCriteriaInUrl?: boolean;
    extraFilters?: TableBasicFilter[];
    selectedRowsMethods?: TableBulkAction<T>[];
    defaultPerPage?: number;
    canChangeSettings?: boolean;
    allowMultiRowSort?: boolean;
    saveMethod?: (rows: T[]) => Promise<void>;
    showSavePopup?: boolean | ((rows: T[]) => Promise<boolean>);
    selectable?: boolean;
}

export interface TableRowInfo<T = object> {
    columns: TableColumnInfo<T>[];
    onRowMouseEnter: (row: T) => void;
    onRowMouseLeave: (row: T) => void;
    customRowComponent?: string;
}
