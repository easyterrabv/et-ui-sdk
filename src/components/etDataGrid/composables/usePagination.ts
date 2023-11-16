import { reactive } from "vue";
import type { PaginationProvide } from "../interfaces/DataGridMethods";

export function usePagination() {
    return reactive<PaginationProvide>({
        // Changeable via UI
        page: 1,
        perPage: 50,

        // Info from APIs
        totalRows: 0
    });
}
