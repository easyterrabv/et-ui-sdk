<template>
    <div
        class="et-badge rounded inline-block font-medium"
        :class="[colorClasses, sizeClasses]"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { UI_SIZING, UI_TYPES } from "../../enums";

export const sharedProps = {
    size: {
        required: false,
        type: String as PropType<UI_SIZING>,
        default: UI_SIZING.S
    }
};

export default defineComponent({
    props: {
        ...sharedProps,
        type: {
            required: false,
            type: String as PropType<UI_TYPES>,
            default: UI_TYPES.DEFAULT
        }
    },
    data() {
        return {
            colorMapping: {
                [UI_TYPES.DEFAULT]: "bg-default-extra-light text-default-dark",
                [UI_TYPES.PRIMARY]: "bg-primary-extra-light text-primary-dark",
                [UI_TYPES.SUCCESS]: "bg-success-extra-light text-success-dark",
                [UI_TYPES.DANGER]: "bg-danger-extra-light text-danger-dark",
                [UI_TYPES.WARNING]: "bg-warning-extra-light text-warning-dark"
            } as { [key in UI_TYPES]: string },

            sizeMapping: {
                [UI_SIZING.XS]: "px-1 py-0.5 text-xs",
                [UI_SIZING.S]: "px-2 py-0.5 text-xs",
                [UI_SIZING.M]: "px-3 py-1 text-sm"
            } as { [key in UI_SIZING]: string }
        };
    },
    computed: {
        colorClasses: (vm) => vm.colorMapping[vm.type],
        sizeClasses: (vm) => vm.sizeMapping[vm.size]
    }
});
</script>
