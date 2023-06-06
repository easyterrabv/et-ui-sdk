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
import { wait } from "../helpers/misc";

export default defineComponent({
    props: {
        fitToggle: {
            type: Boolean,
            required: false,
            default: false
        },
        manual: {
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
        async setPopoverFocus(focus, immediate = false) {
            if (this.manual) {
                return;
            }

            if (focus || immediate) {
                this.focus();
                this.$refs.button.focus();
            } else {
                await this.blur();
                this.$refs.button.blur();
            }
        },
        focus() {
            this.hasFocus = true;
            this.$emit("focus");
        },
        async blur() {
            await wait(150);
            this.hasFocus = false;
            this.$emit("blur");
        }
    },
    emits: {
        focus: () => true,
        blur: () => true
    }
});
</script>
