"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionModel = void 0;
var Model_1 = require("./Model");
var misc_1 = require("../helpers/misc");
var OPTION_COUNT = 0;
var OptionModel = /** @class */ (function (_super) {
    __extends(OptionModel, _super);
    function OptionModel(option) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this.label = option.label;
        _this.value = option.value;
        _this.tags = option.tags || [];
        _this.type = option.type;
        _this.meta = option.meta || {};
        _this.score = 0;
        _this.defaultSortOrder = OPTION_COUNT;
        OPTION_COUNT += 1;
        if (_this.tags.length <= 0) {
            if (_this.label) {
                (_a = _this.tags).push.apply(_a, (0, misc_1.needleFixer)(_this.label).split(" "));
            }
            if (_this.value && _this.value !== _this.label) {
                (_b = _this.tags).push.apply(_b, (0, misc_1.needleFixer)(_this.value).split(" "));
            }
        }
        return _this;
    }
    OptionModel.prototype.calculateAndSetScore = function (needle) {
        this.score = this.calculateScore(needle);
    };
    OptionModel.prototype.calculateScore = function (needle) {
        var score = 0;
        var fixedNeedle = (0, misc_1.needleFixer)(needle || "");
        var fixedLabel = (0, misc_1.needleFixer)(this.label);
        var fixedValue = (0, misc_1.needleFixer)(this.value);
        if (!fixedNeedle) {
            score = -this.defaultSortOrder;
            return score;
        }
        if (fixedLabel === fixedNeedle) {
            score += 10;
        }
        else if (fixedLabel.startsWith(fixedNeedle)) {
            score += 5;
        }
        else if (fixedLabel.includes(fixedNeedle)) {
            score += 1;
        }
        if (fixedValue === fixedNeedle) {
            score += 10;
        }
        else if (fixedValue.startsWith(fixedNeedle)) {
            score += 5;
        }
        else if (fixedValue.includes(fixedNeedle)) {
            score += 1;
        }
        (this.tags || []).forEach(function (tag) {
            if (!tag) {
                return;
            }
            var fixedTag = (0, misc_1.needleFixer)(tag || "");
            if (fixedTag === fixedNeedle) {
                score += 5;
            }
            else if (fixedTag.startsWith(fixedNeedle)) {
                score += 2;
            }
            else if (fixedTag.includes(fixedNeedle)) {
                score += 0.5;
            }
        });
        return score;
    };
    return OptionModel;
}(Model_1.EtModel));
exports.OptionModel = OptionModel;
