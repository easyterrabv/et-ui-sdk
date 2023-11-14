import { reactive } from "vue";
import type { CheckedProvide } from "../interfaces/DataGridMethods";
import type { DataGridRow } from "../interfaces/DataGridRow";

type RowObject = { [key: string]: unknown };

export function useChecked<T extends RowObject = RowObject>(
    rowInfo: DataGridRow<T>,
    rows: T[]
) {
    return reactive<CheckedProvide<T>>({
        rows: [],
        select(row) {
            const checkedRows = this.rows || [];
            checkedRows.push(row);
            this.rows = checkedRows;
        },
        unSelect(needle) {
            const needleKey = needle[rowInfo.idKey || "guid"];
            this.rows = (this.rows || []).filter((hay) => {
                const hayKey = hay[rowInfo.idKey || "guid"];
                return needleKey !== hayKey;
            });
        },
        isSelected(needle) {
            const needleKey = needle[rowInfo.idKey || "guid"];
            return (
                (this.rows || []).findIndex((hay) => {
                    const hayKey = hay[rowInfo.idKey || "guid"];
                    return needleKey === hayKey;
                }) > -1
            );
        },
        toggle(row) {
            const isSelected = this.isSelected(row);
            if (isSelected) {
                this.unSelect(row);
            } else {
                this.select(row);
            }
        },

        selectAll() {
            this.rows = rows;
        },
        unSelectAll() {
            this.rows = [];
        },
        reset() {
            this.unSelectAll();
        },
        allSelected() {
            // all means all.
            const selectedRowsCount = (this.rows || []).length;
            const totalRows = (rows || []).length;
            return selectedRowsCount >= totalRows;
        },
        anySelected() {
            // any selected means: At least one, but could also be all of them;
            const selectedRowsCount = (this.rows || []).length;
            return selectedRowsCount > 0;
        },
        someSelected() {
            // SOME !== all. so only return true if there is atleast one selected but not all
            if (this.allSelected()) {
                return false;
            }
            return this.anySelected();
        },
        toggleAll() {
            if (this.allSelected()) {
                this.unSelectAll();
            } else {
                this.selectAll();
            }
        }
    });
}
