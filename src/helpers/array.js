"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areArraysWithObjectsEqual = exports.makeArray = void 0;
var makeArray = function (value, preserveFalse, preserveNull) {
    if (preserveFalse === void 0) { preserveFalse = true; }
    if (preserveNull === void 0) { preserveNull = false; }
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
exports.makeArray = makeArray;
var areArraysWithObjectsEqual = function (matchKey, array1, array2) {
    var sameLength = array1.length === array2.length;
    // If they're not the same length. They are not the same. So return false.
    if (!sameLength) {
        return false;
    }
    // If they are the same length. Check if both sides contain the same options.
    // they could be the same length but have different options.
    // Returns true if every item in array1 is found in array2
    var mismatch = false;
    return array1.every(function (array1Item) {
        // If already one mismatch. Shortcut the whole check since arrays cant be equal anymore
        if (mismatch) {
            return false;
        }
        var array1ItemKey = array1Item[matchKey];
        var foundInArray2 = !!array2.find(function (array2Item) {
            var array2ItemKey = array2Item[matchKey];
            return array1ItemKey === array2ItemKey;
        });
        if (!foundInArray2) {
            mismatch = true;
        }
        return foundInArray2;
    });
};
exports.areArraysWithObjectsEqual = areArraysWithObjectsEqual;
