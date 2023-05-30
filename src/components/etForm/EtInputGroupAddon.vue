<template>
    <label
        :class="[sizeClasses]"
        class="rounded-md border-0 ring-inset bg-slate-100 text-text shadow-sm ring-1 ring-default-light"
    >
        <slot></slot>
    </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue-demi";
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
                [UI_SIZING.S]: "px-2.5 py-1",
                [UI_SIZING.M]: "px-3.5 py-2"
            } as { [key in UI_SIZING]: string }
        };
    },
    computed: {
        sizeClasses: (vm): string => vm.sizeMapping[vm.size]
    }
});
</script>
