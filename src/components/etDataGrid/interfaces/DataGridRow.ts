import type { RowObject } from "./DataRowObject";

export type IClass = string[];
export type IRowClass<T extends RowObject = RowObject> =
    | IClass
    | ((row: T) => IClass);

export interface DataGridRow<T extends RowObject = RowObject> {
    idKey: string; // The key that uniquely identifies the row
    onRowClick?: (row: T, rows: T[]) => Promise<void> | void;
    isSelectable?: boolean;
    class?: IRowClass<T>;
}
