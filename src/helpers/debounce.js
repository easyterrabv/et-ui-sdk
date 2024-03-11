"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debounce = void 0;
var Debounce = /** @class */ (function () {
    function Debounce(callback, wait) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        this.callback = callback;
        this.wait = wait;
        this.args = args;
    }
    Debounce.prototype.debounce = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.timeOutID) {
            window.clearTimeout(this.timeOutID);
        }
        this.timeOutID = window.setTimeout(function () {
            var _a;
            (_a = _this.callback) === null || _a === void 0 ? void 0 : _a.apply(null, __spreadArray(__spreadArray([], _this.args, true), args, true));
        }, this.wait);
    };
    return Debounce;
}());
exports.Debounce = Debounce;
