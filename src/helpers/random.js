"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isElementOrParentEqualTo = exports.generateId = exports.randomString = void 0;
var randomString = function (len) {
    if (len === void 0) { len = 10; }
    var result = [];
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    var str = "";
    try {
        var dec2hex = function (dec) {
            return dec.toString(16).padStart(2, "0");
        };
        var arr = new Uint8Array((len || 40) / 2);
        window.crypto.getRandomValues(arr);
        str = Array.from(arr, dec2hex).join("");
    }
    catch (e) {
        // tslint:disable-next-line:no-console
        console.info("Something went wrong with generating a random hex using window.crypto", e);
    }
    for (var i = str.length; i < len; i++) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return str + result.join("");
};
exports.randomString = randomString;
var generateId = function (len, namespace) {
    if (len === void 0) { len = 15; }
    if (namespace === void 0) { namespace = ""; }
    return "ET_" + (namespace ? namespace + "_" : "") + (0, exports.randomString)(len);
};
exports.generateId = generateId;
var isElementOrParentEqualTo = function (element, targetElement) {
    if (!element || !targetElement)
        return false;
    // Check if the element itself matches the target element
    if (element === targetElement)
        return true;
    // If the current element has a parent, recursively check its parent
    if (element.parentElement) {
        return (0, exports.isElementOrParentEqualTo)(element.parentElement, targetElement);
    }
    // None of the element's parents match the target element
    return false;
};
exports.isElementOrParentEqualTo = isElementOrParentEqualTo;
