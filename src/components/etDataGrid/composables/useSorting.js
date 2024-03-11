"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSorting = void 0;
var vue_1 = require("vue");
function useSorting(isMultiSorting) {
    if (isMultiSorting === void 0) { isMultiSorting = false; }
    return (0, vue_1.reactive)({
        isMultiSorting: isMultiSorting,
        sorting: {},
        getField: function (column) {
            if (!this.isSortable(column)) {
                return null;
            }
            var header = column.header || undefined;
            var sorting = (header === null || header === void 0 ? void 0 : header.sorting) || undefined;
            if (!sorting) {
                return null;
            }
            return sorting.field;
        },
        setSorting: function (column, direction) {
            var field = this.getField(column);
            if (!field) {
                return;
            }
            if (!this.isMultiSorting) {
                this.clearSorting();
            }
            if (!direction) {
                delete this.sorting[field];
            }
            else {
                this.sorting[field] = direction;
            }
        },
        toggleSorting: function (column) {
            var field = this.getField(column);
            if (!field) {
                return;
            }
            var sortOrder = ["ASC", "DESC", null];
            var currentSort = this.sorting[field] || null;
            var currentSortIndex = sortOrder.indexOf(currentSort);
            var nextSortIndex = currentSortIndex + 1;
            if (nextSortIndex >= sortOrder.length || nextSortIndex < 0)
                nextSortIndex = 0;
            this.setSorting(column, sortOrder[nextSortIndex] || null);
        },
        clearSorting: function () {
            this.sorting = {};
        },
        reset: function (columns) {
            var _this = this;
            var newSorting = {};
            columns.forEach(function (column) {
                if (!_this.isSortable(column)) {
                    return;
                }
                var header = column.header || undefined;
                var sorting = (header === null || header === void 0 ? void 0 : header.sorting) || undefined;
                var defaultDirection = (sorting === null || sorting === void 0 ? void 0 : sorting.default) || undefined;
                if (!defaultDirection || !sorting) {
                    return;
                }
                newSorting[sorting.field] = defaultDirection;
            });
            this.sorting = newSorting;
        },
        isSortable: function (column) {
            var header = column.header || undefined;
            return !!(header === null || header === void 0 ? void 0 : header.sorting);
        },
        getSorting: function (column) {
            var field = this.getField(column);
            if (!field) {
                return null;
            }
            return this.sorting[field] || null;
        }
    });
}
exports.useSorting = useSorting;
