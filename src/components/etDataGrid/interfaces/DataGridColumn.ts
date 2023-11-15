import type { Raw } from "@vue/reactivity";

export type WidthUnit = "px" | "%";

// Volar says I can't self reference. Needs work
// export type KeyUnit = string | `${string}.${KeyUnit}`;

export interface DataGridColumn<T = object> {
    guid: string;
    width?: "grow" | `${number}${WidthUnit}`;
    header?: {
        label: string;
        component?: Raw<object>;
        sorting?: {
            field: string; // KeyUnit;
            default?: "ASC" | "DESC";
        };
    };
    content: {
        key: string; // KeyUnit;
        formatter?: <T2 = object>(data: unknown, row: T2) => Promise<string>;
        component?: Raw<object>;
    };
}
