import { UI_SIZING } from "../../helpers/enums";

export interface ISharedButtonProps {
    disabled?: boolean | (() => boolean);
    readonly?: boolean;
    active?: boolean;
    size?: string;
}

export const propDefaults = {
    disabled: false,
    readonly: false,
    active: false,
    size: UI_SIZING.M
};
