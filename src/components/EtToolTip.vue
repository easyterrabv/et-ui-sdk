<template>
    <span class="et-sdk-tooltip-wrapper">
        <slot></slot>
        <span
            class="et-sdk-tooltip-wrapper--tooltip no-wrap"
            :class="{
                'et-sdk-tooltip-wrapper--tooltip__bottom':
                    props.direction === 'bottom',
                'et-sdk-tooltip-wrapper--tooltip__right':
                    props.direction === 'right'
            }"
        >
            <slot name="tooltip"></slot>
        </span>
    </span>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

const props = defineProps({
    direction: {
        type: String as PropType<"bottom" | "right">,
        required: false,
        default: "bottom"
    }
});
</script>

<style>
.et-sdk-tooltip-wrapper {
    position: relative;
}

.et-sdk-tooltip-wrapper:hover > .et-sdk-tooltip-wrapper--tooltip {
    display: initial;
}

.et-sdk-tooltip-wrapper--tooltip {
    display: none;

    position: absolute;

    background-color: var(--et-sdk-dark-600);
    color: var(--et-sdk-dark-50);
    border-radius: 99999px;
    line-height: initial;
    padding: 4px 16px;
    font-size: var(--et-sdk-font-size-tiny);
    box-shadow: var(--et-sdk-shadow-normal);

    z-index: 1000;
}

.et-sdk-tooltip-wrapper--tooltip:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-width: 4px;
    border-style: solid;
    border-color: transparent transparent var(--et-sdk-dark-600) transparent;
}

.et-sdk-tooltip-wrapper--tooltip__bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 6px;
}

.et-sdk-tooltip-wrapper--tooltip__bottom:after {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
}

.et-sdk-tooltip-wrapper--tooltip__right {
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    margin-left: 6px;
}

.et-sdk-tooltip-wrapper--tooltip__right:after {
    right: 100%;
    transform: translate(1px, 2px);
    border-color: transparent var(--et-sdk-dark-600) transparent transparent;
}
</style>
