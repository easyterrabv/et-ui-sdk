import { OptionModel } from "../models/Option";
import { needleFixer } from "./misc";

export const sortOnBestMatch = (
    needle: string,
    options: OptionModel[]
): OptionModel[] => {
    const fixedNeedle: string = needleFixer(needle);
    const filteredOptions: OptionModel[] = [];

    options.forEach((option: OptionModel) => {
        if (!option) {
            return;
        }

        if (!fixedNeedle) {
            // To keep this in order of supplied array order.
            option.score = -option.defaultSortOrder;
            filteredOptions.push(option);
            return;
        }

        option.calculateAndSetScore(fixedNeedle);
        filteredOptions.push(option);
    });

    return filteredOptions.sort(
        (a: OptionModel, b: OptionModel) => b.score - a.score
    );
};

export const filterOnBestMatch = (
    needle: string,
    options: OptionModel[],
    cutoff: number = 0
): OptionModel[] => {
    const fixedNeedle: string = needleFixer(needle);
    const sortedOnBestMatch: OptionModel[] = sortOnBestMatch(
        fixedNeedle,
        options
    );
    if (!fixedNeedle) {
        return sortedOnBestMatch;
    }
    return sortedOnBestMatch.filter(
        (option: OptionModel) => option.score >= cutoff
    );
};
