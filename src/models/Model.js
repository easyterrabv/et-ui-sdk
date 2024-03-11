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
exports.EtModel = void 0;
var Base_1 = require("./Base");
var random_1 = require("../helpers/random");
var EtModel = /** @class */ (function (_super) {
    __extends(EtModel, _super);
    function EtModel() {
        var _this = _super.call(this) || this;
        _this.guid = (0, random_1.generateId)(40, "model");
        return _this;
    }
    return EtModel;
}(Base_1.Base));
exports.EtModel = EtModel;
