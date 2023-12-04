import type { RowObject } from "./DataGridMethods";
import { type FilterDefinition, FilterInputType } from "./DataGridMethods";

export type IClass = string[];
export type IRowClass<T extends RowObject = RowObject> =
    | IClass
    | ((row: T) => IClass);

export interface DataGridRow<T extends RowObject = RowObject> {
    idKey: string; // The key that uniquely identifies the row
    onRowClick?: (row: T) => Promise<void>;
    isSelectable?: boolean;
    class?: IRowClass<T>;
}

const test: FilterDefinition = {
    field: "Options",
    label: "Has Optiosn",
    default: "",
    type: FilterInputType.SELECT,
    options: []
};
