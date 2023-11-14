export interface CheckedProvide<T = object> {
    rows: T[];

    select: (row: T) => void;
    unSelect: (needle: T) => void;
    isSelected: (needle: T) => boolean;
    toggle: (row: T) => void;

    selectAll: () => void;
    unSelectAll: () => void;
    allSelected: () => boolean;
    someSelected: () => boolean;
    toggleAll: () => void;

    reset: () => void;
}
