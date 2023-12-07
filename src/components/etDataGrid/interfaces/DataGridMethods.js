import { OptionModel } from "../../../models/Option";
export var FilterInputType;
(function (FilterInputType) {
    FilterInputType[FilterInputType["INPUT"] = 0] = "INPUT";
    FilterInputType[FilterInputType["CHECKBOX"] = 1] = "CHECKBOX";
    FilterInputType[FilterInputType["SELECT"] = 2] = "SELECT";
    FilterInputType[FilterInputType["DATERANGE"] = 3] = "DATERANGE";
})(FilterInputType || (FilterInputType = {}));
