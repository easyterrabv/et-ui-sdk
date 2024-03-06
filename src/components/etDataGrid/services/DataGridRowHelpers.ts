import type { DataGridRow, IRowClass, IClass } from "../interfaces/DataGridRow";
import { computed, ref } from "vue";
import type { ComputedRef, Ref } from "@vue/reactivity";
import type { RowObject } from "../interfaces/DataRowObject";

export function getRowClass<T extends RowObject = RowObject>(
    rowInfo: DataGridRow<T>,
    row: T
): ComputedRef<IClass> | Ref<IClass> {
    const rowClass: IRowClass<T> | undefined = rowInfo.class;
    if (!rowClass) {
        return ref<IClass>([]);
    }

    if (typeof rowClass === "function") {
        return computed<IClass>(() => {
            return rowClass(row);
        });
    }

    return ref<IClass>(rowClass);
}
