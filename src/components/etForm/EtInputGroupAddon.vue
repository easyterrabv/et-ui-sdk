<template>
    <label
        :class="[sizeClasses]"
        class="rounded-md border-0 bg-slate-100 text-text shadow-sm ring-1 ring-default-light flex items-center"
    >
        <slot></slot>
    </label>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { UI_SIZING } from "../../enums";

export default defineComponent({
    props: {
        size: {
            required: false,
            type: String as PropType<UI_SIZING>,
            default: UI_SIZING.M
        }
    },
    data() {
        return {
            sizeMapping: {
                [UI_SIZING.XS]: "px-1.5 py-0.5",
                [UI_SIZING.S]: "px-2.5 py-1",
                [UI_SIZING.M]: "px-3.5 py-2",
                [UI_SIZING.L]: "px-4.5 py-3"
            } as { [key in UI_SIZING]: string }
        };
    },
    computed: {
        sizeClasses: (vm): string => vm.sizeMapping[vm.size]
    }
});
</script>
