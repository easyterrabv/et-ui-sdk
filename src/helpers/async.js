"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
var cancelable_promise_1 = require("cancelable-promise");
var wait = function (ms) {
    return (0, cancelable_promise_1.cancelable)(new Promise(function (resolve) {
        setTimeout(resolve, ms);
    }));
};
exports.wait = wait;
