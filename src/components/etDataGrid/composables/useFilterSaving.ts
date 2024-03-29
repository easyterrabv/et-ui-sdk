import { reactive, ref } from "vue";
import type {
    FilterObject,
    FilterSavingProvide,
    SavedFiltersSet
} from "../interfaces/DataGridFilters";
import { makeSlug } from "../../../helpers/misc";

const SAVE_FILTERS_STORAGE_KEY = "ET-SDK-DATA-GRID--SAVED-FILTERS";

export function useFilterSaving(collectionName: string) {
    const savedFilterSets = ref<SavedFiltersSet[]>([]);
    const key = `${SAVE_FILTERS_STORAGE_KEY}+${collectionName}`;

    function saveFilterSet(label: string, filtersObj: FilterObject) {
        const amountOfFilters = Object.keys(filtersObj).length;
        if (amountOfFilters <= 0) {
            return;
        }

        const name = makeSlug(label);

        const currentIndex = savedFilterSets.value.findIndex(
            (f) => f.name === name
        );

        if (currentIndex >= 0) {
            savedFilterSets.value[currentIndex].filters = filtersObj;
        } else {
            savedFilterSets.value.push({ label, name, filters: filtersObj });
        }

        saveAllFilters();
    }

    function removeFilterSet(name: string) {
        savedFilterSets.value = (savedFilterSets.value || []).filter(
            (savedFilter) => savedFilter.name !== name
        );

        saveAllFilters();
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

        const savedFiltersDataBase64 = btoa(
            encodeURIComponent(savedFiltersDataString)
        );

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

        const savedFiltersDataString = decodeURIComponent(
            atob(savedFiltersDataBase64)
        );
        if (!savedFiltersDataString) {
            savedFilterSets.value = [];
            return;
        }

        savedFilterSets.value = JSON.parse(
            savedFiltersDataString
        ) as SavedFiltersSet[];
    }

    loadAllFilters();

    return reactive<FilterSavingProvide>({
        savedFilterSets,

        saveFilterSet,
        removeFilterSet
    });
}
