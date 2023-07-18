<template>
    <button
        ref="etButton"
        class="et-button ring-1 text-white rounded-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-colors motion-safe:ease-in-out motion-safe:duration-150"
        :class="[
            {
                '!cursor-not-allowed': disabled,
                '!cursor-default': readonly
            },
            ...colorClasses,
            sizeClasses
        ]"
        @mouseup.left.stop="(e) => clickDebounce.debounce(e)"
        @keyup.enter="(e) => clickDebounce.debounce(e)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { UI_SIZING, UI_TYPES } from "../../enums";
import { Debounce } from "../../helpers/debounce";

interface iButtonColoring {
    default: string;
    readonly: string;
    active: string;
    disabled: string;
}

export const sharedButtonProps = {
    disabled: { required: false, type: Boolean, default: false },
    readonly: { required: false, type: Boolean, default: false },
    active: { required: false, type: Boolean, default: false },
    size: {
        required: false,
        type: String as PropType<UI_SIZING>,
        default: UI_SIZING.M
    }
};

export default defineComponent({
    props: {
        ...sharedButtonProps,
        type: {
            required: false,
            type: String as PropType<UI_TYPES>,
            default: UI_TYPES.DEFAULT
        }
    },
    data() {
        return {
            colorMapping: {
                [UI_TYPES.DEFAULT]: {
                    default:
                        "ring-default-light bg-white !text-text active:ring-default hover:ring-default focus-visible:outline-default",
                    disabled:
                        "!bg-default-light !text-text hover:!ring-default-light active:!ring-default-light",
                    readonly:
                        "hover:!ring-default-light active:!ring-default-light",
                    active: "!ring-default"
                },
                [UI_TYPES.PRIMARY]: {
                    default:
                        "ring-primary bg-primary active:bg-primary-dark hover:bg-primary-dark focus-visible:outline-primary",
                    disabled:
                        "!bg-primary-light !ring-primary-light hover:!ring-primary-light active:!ring-primary-light",
                    readonly: "hover:!bg-primary active:!bg-primary",
                    active: "!bg-primary-dark"
                },
                [UI_TYPES.SUCCESS]: {
                    default:
                        "ring-success bg-success active:bg-success-dark hover:bg-success-dark focus-visible:outline-success",
                    disabled:
                        "!bg-success-light !ring-success-light hover:!ring-success-light active:!ring-success-light",
                    readonly: "hover:!bg-success active:!bg-success",
                    active: "!bg-success-dark"
                },
                [UI_TYPES.DANGER]: {
                    default:
                        "ring-danger bg-danger active:bg-danger-dark hover:bg-danger-dark focus-visible:outline-danger",
                    disabled:
                        "!bg-danger-light !ring-danger-light hover:!ring-danger-light active:!ring-danger-light",
                    readonly: "hover:!bg-danger active:!bg-danger",
                    active: "!bg-danger-dark"
                },
                [UI_TYPES.WARNING]: {
                    default:
                        "ring-warning bg-warning active:bg-warning-dark hover:bg-warning-dark focus-visible:outline-warning",
                    disabled:
                        "!bg-warning-light !ring-warning-light hover:!ring-warning-light active:!ring-warning-light",
                    readonly: "hover:!bg-warning active:!bg-warning",
                    active: "!bg-warning-dark"
                }
            } as { [key in UI_TYPES]: iButtonColoring },

            sizeMapping: {
                [UI_SIZING.S]: "px-2.5 py-1.5 text-sm",
                [UI_SIZING.M]: "px-3.5 py-2.5 text-sm"
            } as { [key in UI_SIZING]: string },

            clickDebounce: new Debounce(this.onClick, 100)
        };
    },
    computed: {
        colorClasses() {
            const availableColors: iButtonColoring =
                this.colorMapping[this.type];
            const usedColors = [availableColors.default];

            if (this.disabled) {
                usedColors.push(availableColors.disabled);
            } else if (this.readonly) {
                usedColors.push(availableColors.readonly);
            } else if (this.active) {
                usedColors.push(availableColors.active);
            }

            return usedColors;
        },
        sizeClasses: (vm): string => vm.sizeMapping[vm.size]
    },
    methods: {
        onClick(event: Event) {
            if (this.disabled || this.readonly) {
                event.preventDefault();
                return;
            }

            this.$emit("click", event);
        },
        focus() {
            (this.$refs.etButton as HTMLButtonElement).focus();
        },
        blur() {
            (this.$refs.etButton as HTMLButtonElement).blur();
        }
    },
    expose: ["focus", "blur"],
    emits: {
        click: (event: Event) => !!event,
        focus: () => true,
        blur: () => true
    }
});
</script>
