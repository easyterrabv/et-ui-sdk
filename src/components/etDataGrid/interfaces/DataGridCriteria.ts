import type { SortingObject } from "./DataGridMethods";
import type { FilterObject } from "./DataGridFilters";

export interface IDataGridCriteria {
    sorting: SortingObject;
    filters: FilterObject;
    page: number;
    perPage: number;
}
