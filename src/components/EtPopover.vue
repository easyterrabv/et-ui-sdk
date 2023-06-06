<template>
    <div class="relative z-20 inline-block">
        <div
            :tabindex="0"
            ref="toggle"
            @click="(e) => setPopoverFocus(true)"
            @blur="(e) => setPopoverFocus(false)"
        >
            <slot name="toggle"></slot>
        </div>
        <transition
            class="transition ease-out duration-75"
            :style="positionalStyling"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            :class="{
                'w-full': fitToggle
            }"
        >
            <div
                ref="content"
                class="absolute right-0 z-10 my-2"
                v-if="hasFocus"
            >
                <slot></slot>
            </div>
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
            hasFocus: false,
            toggleHeight: 0,
            popTop: false
        };
    },
    computed: {
        positionalStyling() {
            if (this.popTop) {
                return {
                    bottom: this.toggleHeight + "px"
                };
            }
            return {};
        }
    },
    methods: {
        async setPopoverFocus(focus) {
            if (this.manual) {
                return;
            }

            if (focus) {
                await this.open();
                this.$refs.toggle.focus();
            } else {
                await this.hide();
                this.$refs.toggle.blur();
            }
        },
        async open() {
            this.hasFocus = true;
            this.$emit("focus");

            await this.$nextTick();
            this.checkPopDirection();
        },
        async hide() {
            await wait(150);
            this.hasFocus = false;
            this.$emit("blur");
        },
        checkPopDirection() {
            const contentBounds = this.$refs.content.getBoundingClientRect();
            const inputBounds = this.$refs.content.getBoundingClientRect();
            const contentHeight = contentBounds.height;
            const distanceToEnd =
                window.innerHeight - (inputBounds.y + this.toggleHeight);
            this.popTop = distanceToEnd < contentHeight;
        },
        calculateToggleHeight() {
            const bounds = this.$refs.toggle.getBoundingClientRect();
            this.toggleHeight = bounds.height;
        }
    },
    emits: {
        focus: () => true,
        blur: () => true
    },
    mounted() {
        this.calculateToggleHeight();
    }
});
</script>
