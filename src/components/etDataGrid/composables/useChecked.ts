import { reactive } from "vue";
import type { CheckedProvide } from "../interfaces/DataGridMethods";
import type { DataGridRow } from "../interfaces/DataGridRow";

type RowObject = { [key: string]: unknown };

function getRows<T extends RowObject = RowObject>(rows: T[] | (() => T[])) {
    if (typeof rows === "function") {
        return rows();
    }
    return rows;
}

export function useChecked<T extends RowObject = RowObject>(
    rowInfo: DataGridRow<T>,
    tableRows: T[] | (() => T[])
) {
    return reactive<CheckedProvide<T>>({
        rows: [],
        select(row) {
            if (!rowInfo.isSelectable) {
                return;
            }
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
            if (!rowInfo.isSelectable) {
                return;
            }
            this.rows = getRows(tableRows);
        },
        unSelectAll() {
            if (this.rows.length <= 0) {
                // to prevent extra update
                return;
            }
            this.rows = [];
        },
        reset() {
            this.unSelectAll();
        },
        allSelected() {
            // all means all.
            const selectedRowsCount = (this.rows || []).length;
            const totalRows = (getRows(tableRows) || []).length;
            if (totalRows === 0) {
                return false;
            }
            return selectedRowsCount >= totalRows;
        },
        anySelected() {
            // any selected means: At least one, but could also be all of them;
            const selectedRowsCount = (this.rows || []).length;
            return selectedRowsCount > 0;
        },
        someSelected() {
            // SOME !== all. so only return true if there is at least one selected but not all
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
