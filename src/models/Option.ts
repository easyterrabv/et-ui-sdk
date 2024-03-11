import { EtModel } from "./Model";
import { needleFixer } from "../helpers/misc";

let OPTION_COUNT = 0;

export interface IOption {
    value: string | boolean | number | Date;
    label?: string | null;
    tags?: string[];
    type?: string;
    meta?: { [key: string]: any };
}
export class OptionModel extends EtModel {
    constructor(option: IOption) {
        super();
        this.label = option.label;
        this.value = option.value;
        this.tags = option.tags || [];
        this.type = option.type;
        this.meta = option.meta || {};
        this.score = 0;
        this.defaultSortOrder = OPTION_COUNT;

        OPTION_COUNT += 1;

        if (this.tags.length <= 0) {
            if (this.label) {
                this.tags.push(...needleFixer(this.label).split(" "));
            }

            if (this.value && this.value !== this.label) {
                this.tags.push(...needleFixer(this.value).split(" "));
            }
        }
    }

    calculateAndSetScore(needle: string) {
        this.score = this.calculateScore(needle);
    }

    calculateScore(needle: string) {
        let score = 0;
        const fixedNeedle = needleFixer(needle || "");
        const fixedLabel = needleFixer(this.label);
        const fixedValue = needleFixer(this.value);

        if (!fixedNeedle) {
            score = -this.defaultSortOrder;
            return score;
        }

        if (fixedLabel === fixedNeedle) {
            score += 10;
        } else if (fixedLabel.startsWith(fixedNeedle)) {
            score += 5;
        } else if (fixedLabel.includes(fixedNeedle)) {
            score += 1;
        }

        if (fixedValue === fixedNeedle) {
            score += 10;
        } else if (fixedValue.startsWith(fixedNeedle)) {
            score += 5;
        } else if (fixedValue.includes(fixedNeedle)) {
            score += 1;
        }

        (this.tags || []).forEach((tag: string) => {
            if (!tag) {
                return;
            }

            const fixedTag = needleFixer(tag || "");

            if (fixedTag === fixedNeedle) {
                score += 5;
            } else if (fixedTag.startsWith(fixedNeedle)) {
                score += 2;
            } else if (fixedTag.includes(fixedNeedle)) {
                score += 0.5;
            }
        });

        return score;
    }
}
