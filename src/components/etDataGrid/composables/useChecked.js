"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChecked = void 0;
var vue_1 = require("vue");
var DataGridCellHelpers_1 = require("../services/DataGridCellHelpers");
function getRows(rows) {
    if (typeof rows === "function") {
        return rows();
    }
    return rows;
}
function useChecked(rowInfo, tableRows) {
    return (0, vue_1.reactive)({
        rows: [],
        select: function (row) {
            if (!rowInfo.isSelectable) {
                return;
            }
            var checkedRows = this.rows || [];
            checkedRows.push(row);
            this.rows = checkedRows;
        },
        unSelect: function (needle) {
            var key = rowInfo.idKey || "guid";
            var needleKey = (0, DataGridCellHelpers_1.getContentFromKey)(needle, key);
            this.rows = (this.rows || []).filter(function (hay) {
                var hayKey = (0, DataGridCellHelpers_1.getContentFromKey)(hay, key);
                return needleKey !== hayKey;
            });
        },
        isSelected: function (needle) {
            var key = rowInfo.idKey || "guid";
            var needleKey = (0, DataGridCellHelpers_1.getContentFromKey)(needle, key);
            return ((this.rows || []).findIndex(function (hay) {
                var hayKey = (0, DataGridCellHelpers_1.getContentFromKey)(hay, key);
                return needleKey === hayKey;
            }) > -1);
        },
        toggle: function (row) {
            var isSelected = this.isSelected(row);
            if (isSelected) {
                this.unSelect(row);
            }
            else {
                this.select(row);
            }
        },
        selectAll: function () {
            if (!rowInfo.isSelectable) {
                return;
            }
            this.rows = getRows(tableRows);
        },
        unSelectAll: function () {
            if (this.rows.length <= 0) {
                // to prevent extra update
                return;
            }
            this.rows = [];
        },
        reset: function () {
            this.unSelectAll();
        },
        allSelected: function () {
            // all means all.
            var selectedRowsCount = (this.rows || []).length;
            var totalRows = (getRows(tableRows) || []).length;
            if (totalRows === 0) {
                return false;
            }
            return selectedRowsCount >= totalRows;
        },
        anySelected: function () {
            // any selected means: At least one, but could also be all of them;
            var selectedRowsCount = (this.rows || []).length;
            return selectedRowsCount > 0;
        },
        someSelected: function () {
            // SOME !== all. so only return true if there is at least one selected but not all
            if (this.allSelected()) {
                return false;
            }
            return this.anySelected();
        },
        toggleAll: function () {
            if (this.allSelected()) {
                this.unSelectAll();
            }
            else {
                this.selectAll();
            }
        }
    });
}
exports.useChecked = useChecked;
