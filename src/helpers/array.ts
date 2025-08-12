export const makeArray = (
    value: any,
    preserveFalse = true,
    preserveNull = false
): any[] => {
    // If value is an array. Return right away.
    if (Array.isArray(value)) {
        return value;
    }

    // If value is undefined. return empty array.
    if (value === undefined) {
        return [];
    }

    // If value is false, and we don't keep false values. return empty array
    if (value === false && !preserveFalse) {
        return [];
    }

    // If value is false, and we don't keep null values. return empty array
    if (value === null && !preserveNull) {
        return [];
    }

    return [value];
};

export const areArraysWithObjectsEqual = (
    matchKey: string,
    array1: object[],
    array2: object[]
) => {
    const sameLength = array1.length === array2.length;

    // If they're not the same length. They are not the same. So return false.
    if (!sameLength) {
        return false;
    }

    // If they are the same length. Check if both sides contain the same options.
    // they could be the same length but have different options.
    // Returns true if every item in array1 is found in array2
    let mismatch = false;
    return array1.every((array1Item: { [key: string]: any }) => {
        // If already one mismatch. Shortcut the whole check since arrays cant be equal anymore
        if (mismatch) {
            return false;
        }

        const array1ItemKey = array1Item[matchKey];

        const foundInArray2 = !!array2.find(
            (array2Item: { [key: string]: any }) => {
                const array2ItemKey = array2Item[matchKey];
                return array1ItemKey === array2ItemKey;
            }
        );

        if (!foundInArray2) {
            mismatch = true;
        }

        return foundInArray2;
    });
};
