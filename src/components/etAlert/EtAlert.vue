<template>
    <div
        class="et-alert rounded font-medium px-4 py-1.5 drop-shadow-sm ring-1"
        :class="[colorClasses]"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UI_TYPES } from "../../enums";

export default defineComponent({
    props: {
        type: {
            required: false,
            type: String as PropType<UI_TYPES>,
            default: UI_TYPES.DEFAULT
        }
    },
    data() {
        return {
            colorMapping: {
                [UI_TYPES.DEFAULT]:
                    "ring-default-light bg-default-extra-light text-default-dark",
                [UI_TYPES.PRIMARY]:
                    "ring-primary-light bg-primary-extra-light text-primary-dark",
                [UI_TYPES.SUCCESS]:
                    "ring-success-light bg-success-extra-light text-success-dark",
                [UI_TYPES.DANGER]:
                    "ring-danger-light bg-danger-extra-light text-danger-dark",
                [UI_TYPES.WARNING]:
                    "ring-warning-light bg-warning-extra-light text-warning-dark"
            } as { [key in UI_TYPES]: string }
        };
    },
    computed: {
        colorClasses: (vm) => vm.colorMapping[vm.type]
    }
});
</script>
