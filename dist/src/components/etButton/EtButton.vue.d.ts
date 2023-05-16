import type { PropType as __PropType } from 'vue';
import { UI_SIZING, UI_TYPES } from "../../enums";
export interface Props {
    disabled?: Boolean;
    readonly?: Boolean;
    active?: Boolean;
    size?: UI_SIZING;
    type?: UI_TYPES;
}
declare const _sfc_main: import("vue").DefineComponent<{
    disabled: {
        type: __PropType<Boolean | undefined>;
        required: false;
        default: boolean;
    };
    readonly: {
        type: __PropType<Boolean | undefined>;
        required: false;
        default: boolean;
    };
    active: {
        type: __PropType<Boolean | undefined>;
        required: false;
        default: boolean;
    };
    size: {
        type: __PropType<UI_SIZING | undefined>;
        required: false;
        default: UI_SIZING;
    };
    type: {
        type: __PropType<UI_TYPES | undefined>;
        required: false;
        default: UI_TYPES;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "focus" | "blur")[], "click" | "focus" | "blur", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    disabled: {
        type: __PropType<Boolean | undefined>;
        required: false;
        default: boolean;
    };
    readonly: {
        type: __PropType<Boolean | undefined>;
        required: false;
        default: boolean;
    };
    active: {
        type: __PropType<Boolean | undefined>;
        required: false;
        default: boolean;
    };
    size: {
        type: __PropType<UI_SIZING | undefined>;
        required: false;
        default: UI_SIZING;
    };
    type: {
        type: __PropType<UI_TYPES | undefined>;
        required: false;
        default: UI_TYPES;
    };
}>> & {
    onClick?: ((...args: any[]) => any) | undefined;
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
}, {
    disabled: Boolean | undefined;
    readonly: Boolean | undefined;
    active: Boolean | undefined;
    size: UI_SIZING | undefined;
    type: UI_TYPES | undefined;
}, {}>;
export default _sfc_main;
