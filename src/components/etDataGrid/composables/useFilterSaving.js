"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFilterSaving = void 0;
var vue_1 = require("vue");
var misc_1 = require("../../../helpers/misc");
var SAVE_FILTERS_STORAGE_KEY = "ET-SDK-DATA-GRID--SAVED-FILTERS";
function useFilterSaving(collectionName) {
    var savedFilterSets = (0, vue_1.ref)([]);
    var key = "".concat(SAVE_FILTERS_STORAGE_KEY, "+").concat(collectionName);
    function saveFilterSet(label, filtersObj) {
        var amountOfFilters = Object.keys(filtersObj).length;
        if (amountOfFilters <= 0) {
            return;
        }
        var name = (0, misc_1.makeSlug)(label);
        var currentIndex = savedFilterSets.value.findIndex(function (f) { return f.name === name; });
        if (currentIndex >= 0) {
            savedFilterSets.value[currentIndex].filters = filtersObj;
        }
        else {
            savedFilterSets.value.push({ label: label, name: name, filters: filtersObj });
        }
        saveAllFilters();
    }
    function removeFilterSet(name) {
        savedFilterSets.value = (savedFilterSets.value || []).filter(function (savedFilter) { return savedFilter.name !== name; });
        saveAllFilters();
    }
    function saveAllFilters() {
        window.localStorage.removeItem(key);
        if (!savedFilterSets.value) {
            return;
        }
        var savedFiltersDataString = JSON.stringify(savedFilterSets.value);
        if (!savedFiltersDataString) {
            return;
        }
        var savedFiltersDataBase64 = btoa(savedFiltersDataString);
        if (!savedFiltersDataBase64) {
            return;
        }
        window.localStorage.setItem(key, savedFiltersDataBase64);
    }
    function loadAllFilters() {
        var savedFiltersDataBase64 = window.localStorage.getItem(key);
        if (!savedFiltersDataBase64) {
            savedFilterSets.value = [];
            return;
        }
        var savedFiltersDataString = atob(savedFiltersDataBase64);
        if (!savedFiltersDataString) {
            savedFilterSets.value = [];
            return;
        }
        savedFilterSets.value = JSON.parse(savedFiltersDataString);
    }
    loadAllFilters();
    return (0, vue_1.reactive)({
        savedFilterSets: savedFilterSets,
        saveFilterSet: saveFilterSet,
        removeFilterSet: removeFilterSet
    });
}
exports.useFilterSaving = useFilterSaving;
