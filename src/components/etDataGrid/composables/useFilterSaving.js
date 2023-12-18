import { reactive, ref } from "vue";
import { makeSlug } from "src/helpers/misc.ts";
const SAVE_FILTERS_STORAGE_KEY = "ET-SDK-DATA-GRID--SAVED-FILTERS";
export function useFilterSaving(collectionName) {
    const savedFilterSets = ref([]);
    const key = `${SAVE_FILTERS_STORAGE_KEY}+${collectionName}`;
    function saveFilterSet(label, filtersObj) {
        const amountOfFilters = Object.keys(filtersObj).length;
        if (amountOfFilters <= 0) {
            return;
        }
        const name = makeSlug(label);
        const currentIndex = savedFilterSets.value.findIndex((f) => f.name === name);
        if (currentIndex >= 0) {
            savedFilterSets.value[currentIndex].filters = filtersObj;
        }
        else {
            savedFilterSets.value.push({ label, name, filters: filtersObj });
        }
        saveAllFilters();
    }
    function removeFilterSet(name) {
        savedFilterSets.value = (savedFilterSets.value || []).filter((savedFilter) => savedFilter.name !== name);
    }
    function saveAllFilters() {
        window.localStorage.removeItem(key);
        if (!savedFilterSets.value) {
            return;
        }
        const savedFiltersDataString = JSON.stringify(savedFilterSets.value);
        if (!savedFiltersDataString) {
            return;
        }
        const savedFiltersDataBase64 = btoa(savedFiltersDataString);
        if (!savedFiltersDataBase64) {
            return;
        }
        window.localStorage.setItem(key, savedFiltersDataBase64);
    }
    function loadAllFilters() {
        const savedFiltersDataBase64 = window.localStorage.getItem(key);
        if (!savedFiltersDataBase64) {
            savedFilterSets.value = [];
            return;
        }
        const savedFiltersDataString = atob(savedFiltersDataBase64);
        if (!savedFiltersDataString) {
            savedFilterSets.value = [];
            return;
        }
        savedFilterSets.value = JSON.parse(savedFiltersDataString);
    }
    loadAllFilters();
    return reactive({
        savedFilterSets,
        saveFilterSet,
        removeFilterSet
    });
}
