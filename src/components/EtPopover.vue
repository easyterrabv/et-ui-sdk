<template>
    <div class="relative inline-block">
        <div @click="togglePopover">
            <slot name="toggle"></slot>
        </div>
        <transition
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            v-if="$slots.default"
            class="absolute right-0 z-10 mt-2 transition ease-out duration-70"
            :class="{
                'w-full': fitToggle
            }"
        >
            <slot v-if="visible"></slot>
        </transition>
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
