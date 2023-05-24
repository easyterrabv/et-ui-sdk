<template>
    <button
        ref="etButton"
        class="et-button border-2 rounded-md font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-safe:transition-colors motion-safe:ease-in-out motion-safe:duration-150"
        :class="[...colorClasses, sizeClasses]"
        @mouseup.left.stop="(e) => clickDebounce.debounce(e)"
        @keyup.enter="(e) => clickDebounce.debounce(e)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue-demi";
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
    active: { required: false, type: Boolean, default: false }
};

export default defineComponent({
    props: {
        ...sharedButtonProps,
        type: {
            required: false,
            type: String as PropType<UI_TYPES>,
            default: UI_TYPES.DEFAULT
        },
        size: {
            required: false,
            type: String as PropType<UI_SIZING>,
            default: UI_SIZING.M
        }
    },
    data() {
        return {
            colorMapping: {
                [UI_TYPES.DEFAULT]: {
                    default:
                        "border-default-light bg-white text-black active:border-default hover:border-default focus-visible:outline-default",
                    disabled:
                        "!bg-default-light !text-default !cursor-not-allowed hover:!border-default-light active:!border-default-light",
                    readonly:
                        "hover:!border-default-light active:!border-default-light !cursor-default",
                    active: "!border-default"
                },
                [UI_TYPES.PRIMARY]: {
                    default:
                        "border-primary bg-primary text-white active:bg-primary-dark active:border-primary-dark hover:bg-primary-dark hover:border-primary-dark focus-visible:outline-primary",
                    disabled:
                        "!bg-primary-light !border-primary-light !cursor-not-allowed",
                    readonly:
                        "hover:!bg-primary active:!bg-primary !cursor-default",
                    active: "!bg-primary-dark !border-primary-dark"
                }
            } as { [key in UI_TYPES]: iButtonColoring },

            sizeMapping: {
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
