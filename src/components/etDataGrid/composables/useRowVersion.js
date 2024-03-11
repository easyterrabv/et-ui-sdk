"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRowVersion = void 0;
var vue_1 = require("vue");
var DataGridCellHelpers_1 = require("../services/DataGridCellHelpers");
function useRowVersion(rowKeyIdentifier) {
    if (rowKeyIdentifier === void 0) { rowKeyIdentifier = "guid"; }
    return (0, vue_1.reactive)({
        versions: {},
        reset: function (rows) {
            var _this = this;
            this.versions = {};
            rows.forEach(function (row) {
                var key = (0, DataGridCellHelpers_1.getContentFromKey)(row, rowKeyIdentifier);
                if (!key) {
                    return;
                }
                _this.versions[key] = 0;
            });
        },
        increment: function (row) {
            var key = (0, DataGridCellHelpers_1.getContentFromKey)(row, rowKeyIdentifier);
            if (!key) {
                return;
            }
            var value = this.versions[key] || 0;
            this.versions[key] = value += 1;
        }
    });
}
exports.useRowVersion = useRowVersion;
