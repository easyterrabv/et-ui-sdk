import { OptionModel } from "../../../models/Option";
import { type Ref } from "vue";

export enum FilterInputType {
    INPUT,
    CHECKBOX,
    SELECT,
    DATERANGE,
    DYNAMIC_SELECT
}

export type BaseFilterDefinition<T = FilterInputType> = {
    field: string;
    label?: string;
    default?: FilterValue;
    validator?: (value: FilterValue) => boolean;
    formatter?: (value: FilterValue) => any;
    type: T;
};

export type SelectFilterDefinition<T = FilterInputType.SELECT> =
    BaseFilterDefinition<T> & {
        options: OptionModel[] | (() => Promise<OptionModel[]>);
        multiple: boolean;
    };

export type DateFilterDefinition<T = FilterInputType.DATERANGE> = Omit<
    BaseFilterDefinition<T>,
    "default"
> & {
    defaultStart?: string | Date;
    defaultEnd?: string | Date;
};

export type DynamicSelectFilterDefinition<T = FilterInputType.DYNAMIC_SELECT> =
    BaseFilterDefinition<T> & {
        dataGetter: (
            searchInput: string
        ) => Promise<OptionModel[]> | OptionModel[];
        onOptionSelect?: (
            selectedOption: OptionModel | OptionModel[] | null
        ) => void;
        placeholder?: string;
        disabled?: boolean;
        multiple?: boolean;
    };

export type FilterTypeMapping<T> = {
    [FilterInputType.SELECT]: SelectFilterDefinition<T>;
    [FilterInputType.DATERANGE]: DateFilterDefinition<T>;
    [FilterInputType.DYNAMIC_SELECT]: DynamicSelectFilterDefinition<T>;
};

export type FilterDefinition<T extends FilterInputType = FilterInputType> =
    T extends keyof FilterTypeMapping<T>
        ? FilterTypeMapping<T>[T]
        : BaseFilterDefinition<T>;

export interface FilterDisplay {
    field: string;
    value: FilterValue;
    label: string;
    definition: FilterDefinition;
}

export type OptionFilterValue = {
    value: string | boolean | number | Date;
    label: string | null;
};

export type FilterDateValue = [Date | null, Date | null];

export type FilterPrimitives = string | number | boolean | null | undefined;

export type FilterValue =
    | FilterPrimitives
    | FilterPrimitives[]
    | OptionFilterValue[]
    | FilterDateValue
    | OptionModel
    | OptionModel[];

export type FilterObject = {
    [field: string]: FilterValue;
};

export interface FiltersProvide {
    filtersValues: FilterObject;

    setFilters: (filters: FilterObject) => void;

    setFilter: (field: string, value: FilterValue) => void;
    getFilter: (field: string) => FilterValue;

    clearFilters: () => void;
    reset: () => void;

    getFiltersDefinitions: () => FilterDefinition[];
    hasFilters: () => boolean;
}

export type FiltersStagingProvide = Pick<
    FiltersProvide,
    "filtersValues" | "setFilter" | "getFilter"
>;

export interface SavedFiltersSet {
    name: string;
    label: string;
    filters: FilterObject;
}

export interface FilterSavingProvide {
    savedFilterSets: Ref<SavedFiltersSet[]>;
    saveFilterSet: (name: string, filters: FilterObject) => void;
    removeFilterSet: (name: string) => void;
}
