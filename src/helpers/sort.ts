export type SortOrder = "ASC" | "DESC" | null;

export type SortConfig = {
    [key: string]: SortOrder;
};

export const sortByProperties = (array: T[], sortConfig: SortConfig): T[] => {
    const compare = (
        a: any,
        b: any,
        prop: string,
        order: SortOrder
    ): number => {
        const aValue = a[prop];
        const bValue = b[prop];

        if (aValue < bValue) {
            return order === "ASC" ? -1 : 1;
        }

        if (aValue > bValue) {
            return order === "ASC" ? 1 : -1;
        }

        return 0;
    };

    return array.sort((a, b) => {
        for (const prop in sortConfig) {
            if (!sortConfig.hasOwnProperty(prop)) {
                continue;
            }

            const order = sortConfig[prop];
            if (order !== null) {
                const result = compare(a, b, prop, order);
                if (result !== 0) {
                    return result;
                }
            }
        }
        return 0;
    });
};
