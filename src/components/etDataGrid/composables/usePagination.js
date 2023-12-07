import { reactive } from "vue";
export function usePagination() {
    return reactive({
        // Changeable via UI
        page: 1,
        perPage: 50,
        // Info from APIs
        totalRows: 0
    });
}
