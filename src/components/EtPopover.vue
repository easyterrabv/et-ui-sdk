<template>
    <div class="et-popover-wrapper">
        <div
            :tabindex="-1"
            class="et-popover-toggle w-full"
            ref="toggle"
            @mouseup.left.stop="(e) => !manual && setPopoverFocus(true)"
            @blur="(e) => !manual && setPopoverFocus(false)"
        >
            <slot name="toggle" :togglePopover="togglePopover"></slot>
        </div>
        <Teleport to="body">
            <div
                ref="content"
                class="et-popover-content"
                :class="{
                    'w-fit': !fitToggle
                }"
                :style="styles"
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
    computed: {
        styles() {
            if (this.fitToggle) {
                return {
                    width: this.toggleWidth + "px"
                };
            }
            return {};
        }
    },
    methods: {
        async togglePopover() {
            if (this.hasFocus) {
                return await this.setPopoverFocus(false);
            }

            return await this.setPopoverFocus(true);
        },
        async setPopoverFocus(focus) {
            if (focus) {
                await this.open();
                this.buttonElement.focus();
            } else {
                await this.hide();
                this.buttonElement.blur();
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
            const bounds = this.buttonElement.getBoundingClientRect();
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
        this.buttonElement = this.$refs.toggle;
        this.tooltipElement = this.$refs.content;
        this.popperInstance = createPopper(
            this.buttonElement,
            this.tooltipElement,
            {
                placement: "bottom"
            }
        );

        this.calculateToggleWidth();
    }
});
</script>
