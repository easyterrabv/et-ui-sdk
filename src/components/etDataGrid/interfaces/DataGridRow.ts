export interface DataGridRow<T = object> {
    idKey: string; // The key that uniquely identifies the row
    onRowClick?: (row: T) => void;
    isSelectable?: boolean;
}
