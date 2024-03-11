"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCellWidth = void 0;
var vue_1 = require("vue");
function useCellWidth() {
    return (0, vue_1.reactive)({
        growCells: 0,
        maxGrowCellWidth: null,
        calculateGrowCells: function (columns) {
            this.growCells = columns.reduce(function (count, column) {
                var _a;
                if (((_a = column.width) !== null && _a !== void 0 ? _a : "grow") === "grow") {
                    return count + 1;
                }
                return count;
            }, 0);
        },
        calculateMaxWidth: function (tableWidth, columns, isSelectable) {
            var usedWidth = columns.reduce(function (count, column) {
                var _a;
                if (((_a = column.width) !== null && _a !== void 0 ? _a : "grow") !== "grow") {
                    return (count +
                        parseInt((column.width || "0px").split("px")[0], 10));
                }
                return count;
                // Starts with 40, due to row padding, and another 40 if checking is enabled
            }, 40 + (isSelectable ? 40 : 0));
            this.maxGrowCellWidth = (tableWidth - usedWidth) / this.growCells;
        },
        calculate: function (tableWidth, columns, isSelectable) {
            this.calculateGrowCells(columns);
            this.calculateMaxWidth(tableWidth, columns, isSelectable);
        }
    });
}
exports.useCellWidth = useCellWidth;
