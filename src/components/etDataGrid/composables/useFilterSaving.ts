import { reactive, ref } from "vue";
import type {
    FilterObject,
    FilterSavingProvide,
    FiltersProvide,
    SavedFiltersSet
} from "../interfaces/DataGridMethods";

const SAVE_FILTERS_STORAGE_KEY = "ET-SDK-DATA-GRID--SAVED-FILTERS";

export function useFilterSaving(tableName: string, filters: FiltersProvide) {
    const savedFilters = ref<SavedFiltersSet[]>([]);
    const key = `${SAVE_FILTERS_STORAGE_KEY}+${tableName}`;

    function setFilters(name: string) {
        const savedFiltersSet = savedFilters.value.find((f) => f.name === name);

        if (savedFiltersSet) {
            filters.setFilters(savedFiltersSet.filters);
        }
    }

    function removeSavedFilters(name: string) {
        savedFilters.value = (savedFilters.value || []).filter(
            (savedFilter) => savedFilter.name !== name
        );
    }

    function saveFilters(name: string, filtersObj: FilterObject) {
        const amountOfFilters = Object.keys(filtersObj).length;
        if (amountOfFilters <= 0) {
            return;
        }

        const currentIndex = savedFilters.value.findIndex(
            (f) => f.name === name
        );

        if (currentIndex >= 0) {
            savedFilters.value[currentIndex].filters = filtersObj;
        } else {
            savedFilters.value.push({ name, filters: filtersObj });
        }

        saveAllFilters();
    }

    function saveAllFilters() {
        window.localStorage.removeItem(key);

        if (!savedFilters.value) {
            return;
        }

        const savedFiltersDataString = JSON.stringify(savedFilters.value);

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
            savedFilters.value = [];
            return;
        }

        const savedFiltersDataString = atob(savedFiltersDataBase64);
        if (!savedFiltersDataString) {
            savedFilters.value = [];
            return;
        }

        savedFilters.value = JSON.parse(
            savedFiltersDataString
        ) as SavedFiltersSet[];
    }

    function getAllFilters() {
        return savedFilters;
    }

    loadAllFilters();

    return reactive<FilterSavingProvide>({
        savedFilters,
        removeSavedFilters,
        setFilters,
        saveFilters,
        getAllFilters
    });
}
