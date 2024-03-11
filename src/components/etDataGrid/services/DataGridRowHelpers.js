"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRowClass = void 0;
var vue_1 = require("vue");
function getRowClass(rowInfo, row) {
    var rowClass = rowInfo.class;
    if (!rowClass) {
        return (0, vue_1.ref)([]);
    }
    if (typeof rowClass === "function") {
        return (0, vue_1.computed)(function () {
            return rowClass(row);
        });
    }
    return (0, vue_1.ref)(rowClass);
}
exports.getRowClass = getRowClass;
