import type { RowObject } from "./DataGridMethods";

export interface DataGridRow<T extends RowObject = RowObject> {
    idKey: string; // The key that uniquely identifies the row
    onRowClick?: (row: T) => Promise<void>;
    isSelectable?: boolean;
}
