"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
exports.pleaseWait = exports.formatCurrency = exports.makeSlug = exports.addLeadingZero = exports.needleFixer = void 0;
var vue_1 = require("vue");
var needleFixer = function (val) {
    var innerVal = val;
    if (typeof val === "bigint" || typeof val === "number") {
        innerVal = (val || 0).toString();
    }
    else if (typeof val === "boolean") {
        innerVal = innerVal ? "true" : "false";
    }
    else if (typeof val === "string") {
        innerVal = val;
    }
    else if (val instanceof Date) {
        var year = val.getFullYear();
        var month = val.getMonth();
        var date = val.getDate();
        innerVal = "".concat(year, "-").concat(month + 1, "-").concat(date);
    }
    else {
        innerVal = "";
    }
    return (innerVal || "").toLowerCase().trim();
};
exports.needleFixer = needleFixer;
var addLeadingZero = function (input) {
    var inputAsNumber;
    if (typeof input === "string") {
        inputAsNumber = parseInt(input, 10);
    }
    else {
        inputAsNumber = input;
    }
    // Parse the input as an integer
    if (!isNaN(inputAsNumber) && inputAsNumber < 10) {
        return "0" + inputAsNumber; // Add a leading zero if the number meets the condition
    }
    if (isNaN(inputAsNumber)) {
        return "00";
    }
    return String(inputAsNumber); // Otherwise, return the input as a string
};
exports.addLeadingZero = addLeadingZero;
var makeSlug = function (text) {
    if (!text) {
        return text;
    }
    return ((text || "")
        .toString()
        .trim()
        // Use the Unicode normalization method to ensure consistent treatment of accented characters
        .normalize("NFKD")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, ""));
};
exports.makeSlug = makeSlug;
function formatCurrency(amount, currencyCode) {
    return new Intl.NumberFormat(__spreadArray(__spreadArray([], navigator.languages, true), ["en-US"], false), {
        style: "currency",
        currency: currencyCode || "EUR"
    }).format(amount);
}
exports.formatCurrency = formatCurrency;
function pleaseWait(callback) {
    return __awaiter(this, void 0, void 0, function () {
        var modalProvide, guid, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modalProvide = (0, vue_1.inject)("SDKModalProvide");
                    guid = modalProvide === null || modalProvide === void 0 ? void 0 : modalProvide.openModal("SDKPleaseWait");
                    return [4 /*yield*/, callback(guid)];
                case 1:
                    result = _a.sent();
                    if (guid) {
                        modalProvide === null || modalProvide === void 0 ? void 0 : modalProvide.closeModal(guid);
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.pleaseWait = pleaseWait;
