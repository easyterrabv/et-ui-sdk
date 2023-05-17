import type { PropType } from "vue-demi";
import { UI_SIZING, UI_TYPES } from "../../enums";
import { Debounce } from "../../helpers/debounce";
declare const _sfc_main: import("vue-demi").DefineComponent<{
    disabled: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        required: false;
        type: PropType<UI_SIZING>;
        default: UI_SIZING;
    };
    type: {
        required: false;
        type: PropType<UI_TYPES>;
        default: UI_TYPES;
    };
}, unknown, {
    clickDebounce: Debounce;
}, {
    computedClasses(): string;
}, {
    onClick(event: Event): void;
    focus(): void;
    blur(): void;
}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {
    click: (event: Event) => true;
    focus: () => true;
    blur: () => true;
}, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    disabled: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    readonly: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    active: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        required: false;
        type: PropType<UI_SIZING>;
        default: UI_SIZING;
    };
    type: {
        required: false;
        type: PropType<UI_TYPES>;
        default: UI_TYPES;
    };
}>> & {
    onFocus?: (() => any) | undefined;
    onBlur?: (() => any) | undefined;
    onClick?: ((event: Event) => any) | undefined;
}, {
    disabled: boolean;
    readonly: boolean;
    active: boolean;
    size: UI_SIZING;
    type: UI_TYPES;
}, {}>;
export default _sfc_main;
