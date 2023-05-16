import {UI_SIZING, UI_TYPES} from "../enums";

const buttonTypeMap: Map<UI_TYPES, string> = new Map([
    [UI_TYPES.DEFAULT, 'button-type__default'],
    [UI_TYPES.PRIMARY, 'button-type__primary'],
    [UI_TYPES.SUCCESS, 'button-type__success'],
    [UI_TYPES.DANGER, 'button-type__danger'],
    [UI_TYPES.WARNING, 'button-type__warning'],
    [UI_TYPES.PREMIUM, 'button-type__premium'],
]);

const commonButtonHoverClasses = 'cursor-pointer';
const buttonTypeHoverMap: Map<UI_TYPES, string> = new Map([
    [UI_TYPES.DEFAULT, `${commonButtonHoverClasses} button-type__default__hover`],
    [UI_TYPES.PRIMARY, `${commonButtonHoverClasses} button-type__primary__hover`],
    [UI_TYPES.SUCCESS, `${commonButtonHoverClasses} button-type__success__hover`],
    [UI_TYPES.DANGER, `${commonButtonHoverClasses} button-type__danger__hover`],
    [UI_TYPES.WARNING, `${commonButtonHoverClasses} button-type__warning__hover`],
    [UI_TYPES.PREMIUM, `${commonButtonHoverClasses} button-type__premium__hover`],
]);

const commonButtonDisabledClasses = 'cursor-not-allowed';
const buttonTypeDisabledMap: Map<UI_TYPES, string> = new Map([
    [UI_TYPES.DEFAULT, `${commonButtonDisabledClasses} button-type__default__disabled`],
    [UI_TYPES.PRIMARY, `${commonButtonDisabledClasses} button-type__primary__disabled`],
    [UI_TYPES.SUCCESS, `${commonButtonDisabledClasses} button-type__success__disabled`],
    [UI_TYPES.DANGER, `${commonButtonDisabledClasses} button-type__danger__disabled`],
    [UI_TYPES.WARNING, `${commonButtonDisabledClasses} button-type__warning__disabled`],
    [UI_TYPES.PREMIUM, `${commonButtonDisabledClasses} button-type__premium__disabled`],
]);

const sizeMap: Map<UI_SIZING, string> = new Map([
    [UI_SIZING.XS, 'sizing__xs'],
    [UI_SIZING.S, 'sizing__s'],
    [UI_SIZING.M, 'sizing__m'],
    [UI_SIZING.L, 'sizing__l'],
]);

export const typeToButtonClass = (type:UI_TYPES): string => {
    return (buttonTypeMap.has(type) ? buttonTypeMap.get(type) : buttonTypeMap.get(UI_TYPES.DEFAULT)) || '';
}

export const typeToButtonHoverClass = (type:UI_TYPES): string => {
    return (buttonTypeHoverMap.has(type) ? buttonTypeHoverMap.get(type) : buttonTypeHoverMap.get(UI_TYPES.DEFAULT)) || '';
}

export const typeToButtonDisabledClass = (type:UI_TYPES): string => {
    return (buttonTypeDisabledMap.has(type) ? buttonTypeDisabledMap.get(type) : buttonTypeDisabledMap.get(UI_TYPES.DEFAULT)) || '';
}

export const sizeToClass = (size: UI_SIZING): string => {
    return (sizeMap.has(size) ? sizeMap.get(size) : sizeMap.get(UI_SIZING.M)) || '';
}