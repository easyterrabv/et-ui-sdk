"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFilters = void 0;
var vue_1 = require("vue");
function useFilters(filtersDefinitionsGetter) {
    return (0, vue_1.reactive)({
        filtersValues: {},
        setFilters: function (newFilters) {
            this.filtersValues = Object.entries(newFilters).reduce(function (prev, _a) {
                var key = _a[0], value = _a[1];
                if (value !== null && value !== undefined) {
                    prev[key] = value;
                }
                return prev;
            }, {});
        },
        setFilter: function (field, value) {
            var filters = JSON.parse(JSON.stringify(this.filtersValues));
            if (value === null || value === undefined) {
                delete filters[field];
            }
            else {
                filters[field] = value;
            }
            this.setFilters(filters);
        },
        getFilter: function (field) {
            var _a;
            return (_a = this.filtersValues[field]) !== null && _a !== void 0 ? _a : null;
        },
        clearFilters: function () {
            this.setFilters({});
        },
        reset: function () {
            var newFilters = {};
            var filterDefinitions = this.getFiltersDefinitions();
            filterDefinitions.forEach(function (filterDefinition) {
                if (!filterDefinition) {
                    return;
                }
                var _a = filterDefinition, field = _a.field, defaultValue = _a.default;
                if (defaultValue) {
                    newFilters[field] = defaultValue;
                }
            });
            this.setFilters(newFilters);
        },
        getFiltersDefinitions: function () {
            return filtersDefinitionsGetter();
        },
        hasFilters: function () {
            var filterDefinitions = this.getFiltersDefinitions();
            return filterDefinitions.length > 0;
        }
    });
}
exports.useFilters = useFilters;
