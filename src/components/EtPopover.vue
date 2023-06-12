<template>
    <div class="inline-block w-full">
        <div
            :tabindex="0"
            ref="toggle"
            @mouseup.left.stop="(e) => setPopoverFocus(true)"
            @blur="(e) => setPopoverFocus(false)"
        >
            <slot name="toggle"></slot>
        </div>
        <Teleport to="body">
            <div
                ref="content"
                :style="{
                    width: toggleWidth + 'px'
                }"
                v-show="hasFocus"
            >
                <slot></slot>
            </div>
        </Teleport>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { wait } from "../helpers/async";
import { createPopper } from "@popperjs/core";
import type { Instance } from "@popperjs/core/lib/types";

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
            hasFocus: false as Boolean,
            toggleWidth: 0 as Number,
            buttonElement: null as HTMLElement,
            tooltipElement: null as HTMLElement,
            popperInstance: null as Instance
        };
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
            this.calculateToggleWidth();
            this.hasFocus = true;
            this.$emit("focus");
            await this.popperInstance.update();
        },
        async hide() {
            await wait(150);
            this.hasFocus = false;
            this.$emit("blur");
            await this.popperInstance.update();
        },
        calculateToggleWidth() {
            const bounds = this.$refs.toggle.getBoundingClientRect();
            this.toggleWidth = bounds.width;
        },
        isOpen() {
            return this.hasFocus;
        }
    },
    emits: {
        focus: () => true,
        blur: () => true
    },
    mounted() {
        this.calculateToggleWidth();

        this.buttonElement = this.$refs.toggle;
        this.tooltipElement = this.$refs.content;
        this.popperInstance = createPopper(
            this.buttonElement,
            this.tooltipElement,
            {
                placement: "bottom"
            }
        );
    }
});
</script>
