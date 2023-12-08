<template>
    <div class="et-sdk-popover">
        <div
            :tabindex="-1"
            class="et-sdk-popover--toggle"
            ref="toggle"
            @mouseup.left.stop="(e) => !manual && setPopoverFocus(true)"
            @blur="(e) => !manual && setPopoverFocus(false)"
        >
            <slot name="toggle" :togglePopover="togglePopover"></slot>
        </div>
        <Teleport to="body">
            <div
                ref="content"
                class="et-sdk-popover--content"
                :class="{
                    'et-sdk-popover--content__fit_toggle': !fitToggle
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
import { defineComponent } from "vue";
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
            buttonElement: undefined as HTMLElement | undefined,
            tooltipElement: undefined as HTMLElement | undefined,
            popperInstance: undefined as Instance | undefined
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
        async togglePopover(): Promise<void> {
            if (this.hasFocus) {
                return await this.setPopoverFocus(false);
            }

            await this.setPopoverFocus(true);
        },
        async setPopoverFocus(focus: boolean): Promise<void> {
            if (focus) {
                await this.open();
                this.buttonElement?.focus();
            } else {
                await this.hide();
                this.buttonElement?.blur();
            }
        },
        async open() {
            this.calculateToggleWidth();
            this.hasFocus = true;
            this.$emit("focus");
            await this.popperInstance?.update();
        },
        async hide() {
            await wait(150);
            this.hasFocus = false;
            this.$emit("blur");
            await this.popperInstance?.update();
        },
        calculateToggleWidth() {
            const bounds = this.buttonElement?.getBoundingClientRect();
            this.toggleWidth = bounds?.width || 300;
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
        this.buttonElement = this.$refs.toggle as any;
        this.tooltipElement = this.$refs.content as any;
        this.popperInstance = createPopper(
            this.buttonElement as any,
            this.tooltipElement as any,
            {
                placement: "bottom",
                modifiers: [
                    {
                        name: "flip",
                        options: {
                            fallbackPlacements: ["top"]
                        }
                    }
                ]
            }
        );

        this.calculateToggleWidth();
    }
});
</script>

<style>
.et-sdk-popover--toggle {
    width: 100%;
}

.et-sdk-popover--content {
    z-index: 20000;
}

.et-sdk-popover--content__fit_toggle {
    width: fit-content;
    block-size: fit-content;
}
</style>
