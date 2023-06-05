<template>
    <div class="relative inline-block">
        <div @click="togglePopover">
            <slot name="toggle"></slot>
        </div>
        <div
            v-if="$slots.default"
            class="absolute right-0 z-10 mt-2 transition ease-out duration-75 transform"
            :class="{
                'opacity-0 scale-80': !visible,
                'opacity-100 scale-100': visible,
                'w-full': fitToggle
            }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
    props: {
        fitToggle: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        togglePopover() {
            this.visible = !this.visible;
        }
    }
});
</script>
