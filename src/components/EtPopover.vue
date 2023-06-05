<template>
    <div class="relative inline-block">
        <div
            :tabindex="0"
            ref="button"
            @click="(e) => setPopoverFocus(!hasFocus, true)"
            @blur="(e) => setPopoverFocus(false)"
        >
            <slot name="toggle"></slot>
        </div>
        <transition
            class="absolute right-0 z-10 mt-2 transition ease-out duration-75"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            v-if="$slots.default"
            :class="{
                'w-full': fitToggle
            }"
        >
            <slot v-if="hasFocus"></slot>
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
            hasFocus: false
        };
    },
    methods: {
        setPopoverFocus(focus, immediate = false) {
            if (focus || immediate) {
                this.hasFocus = !!focus;
                this.$refs.button.focus();
            } else {
                setTimeout(() => {
                    this.hasFocus = false;
                }, 75);
            }
        }
    }
});
</script>
