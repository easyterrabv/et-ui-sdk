"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortByProperties = void 0;
var sortByProperties = function (array, sortConfig) {
    var compare = function (a, b, prop, order) {
        var aValue = a[prop];
        var bValue = b[prop];
        if (aValue < bValue) {
            return order === "ASC" ? -1 : 1;
        }
        if (aValue > bValue) {
            return order === "ASC" ? 1 : -1;
        }
        return 0;
    };
    return array.sort(function (a, b) {
        for (var prop in sortConfig) {
            if (!sortConfig.hasOwnProperty(prop)) {
                continue;
            }
            var order = sortConfig[prop];
            if (order !== null) {
                var result = compare(a, b, prop, order);
                if (result !== 0) {
                    return result;
                }
            }
        }
        return 0;
    });
};
exports.sortByProperties = sortByProperties;
