function deepClone<T>(items: T[]): T[] {
    return items.map((item) => clone(item));
}

function clone<T>(item: T): T {
    if (item === null || item === undefined) {
        return item;
    }

    // Handle Date
    if (item instanceof Date) {
        return new Date(item.getTime()) as any;
    }

    // Handle Array
    if (Array.isArray(item)) {
        return item.map(clone) as any;
    }

    // Handle Object
    if (typeof item === "object") {
        // Handle class instances
        if (item.constructor !== Object) {
            // Create a new instance of the class
            const newInstance = new (item.constructor as new () => T)();
            for (const key in item) {
                // eslint-disable-next-line no-prototype-builtins
                if (item.hasOwnProperty(key)) {
                    newInstance[key] = clone(item[key]);
                }
            }
            return newInstance;
        }

        // Handle plain objects
        const objClone = {} as T;
        for (const key in item) {
            // eslint-disable-next-line no-prototype-builtins
            if (item.hasOwnProperty(key)) {
                objClone[key] = clone(item[key]);
            }
        }
        return objClone;
    }

    // Handle primitive types (number, string, boolean, etc.)
    return item;
}

export { deepClone, clone };
