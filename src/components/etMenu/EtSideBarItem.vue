<template>
    <div
        class="py-1 hover:bg-white cursor-pointer text-sm transition-all ease-in-out duration-150"
        :class="[
            {
                'bg-primary hover:!bg-primary-dark text-white': isActive,
                'mr-6 rounded-r-full pl-4': !isCollapsed,
                'mx-2 rounded-full text-center': isCollapsed
            }
        ]"
    >
        <span
            v-if="$slots.icon"
            class="w-3 px-2 text-primary"
            :class="[
                {
                    '!text-white': isActive
                }
            ]"
        >
            <slot name="icon"></slot>
        </span>
        <span v-if="!isCollapsed">
            <slot></slot>
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        isActive: {
            type: Boolean,
            required: false,
            default: false
        },
        isCollapsed: {
            type: Boolean,
            required: false,
            default: false
        }
    }
});
</script>
