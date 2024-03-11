"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePagination = void 0;
var vue_1 = require("vue");
function usePagination() {
    return (0, vue_1.reactive)({
        // Changeable via UI
        page: 1,
        perPage: 50,
        // Info from APIs
        totalRows: 0
    });
}
exports.usePagination = usePagination;
