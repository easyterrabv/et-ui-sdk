import type { Raw } from "@vue/reactivity";
import type { FilterValue, RowObject } from "./DataGridMethods";

export type WidthUnit = "px" | "%";

// Volar says I can't self reference. Needs work
// export type KeyUnit = string | `${string}.${KeyUnit}`;

export interface DataGridColumn<T extends RowObject = RowObject> {
    guid: string;
    width?: "grow" | `${number}${WidthUnit}`;
    header?: {
        label: string;
        component?: Raw<object>;
        sorting?: {
            field: string; // KeyUnit;
            default?: "ASC" | "DESC";
        };
        filter?: {
            field: string;
            default?: FilterValue;
        };
    };
    content: {
        key: string; // KeyUnit;
        formatter?: (data: unknown, row: T) => Promise<string>;
        component?: Raw<object>;
    };
}
