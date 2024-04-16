<template>
    <span class="et-sdk-tooltip-wrapper">
        <span class="et-sdk-tooltip--toggle" ref="toggle">
            <slot></slot>
        </span>
        <Teleport to="body" v-if="$slots.tooltip">
            <div
                ref="content"
                v-show="isVisible"
                class="et-sdk-tooltip--content et-sdk-tooltip-wrapper--tooltip no-wrap"
                :class="contentClass"
            >
                <slot name="tooltip"></slot>
            </div>
        </Teleport>
    </span>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { createPopper } from "@popperjs/core";
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import type { Placement } from "@popperjs/core/lib/enums";
import type { Instance } from "@popperjs/core/lib/types";
import { wait } from "../helpers/async";
import type { CancelablePromise } from "cancelable-promise";

const props = defineProps({
    direction: {
        type: String as PropType<Placement>,
        required: false,
        default: "bottom"
    },
    offset: {
        type: Number,
        required: false,
        default: 10
    },
    delay: {
        // In Milliseconds
        type: Number,
        required: false,
        default: 0
    },
    contentClass: {
        type: String,
        required: false,
        default: ""
    },
    keepAliveOnContent: {
        type: Boolean,
        required: false,
        default: false
    }
});

const toggle = ref(null);
const content = ref(null);
const isVisible = ref(false);
const waiter = ref<CancelablePromise | null>(null);
const isOnElement = ref(false);

let hasKeepAliveEvents = false;

let popperInstance: Instance | null = null;

async function showToolTip() {
    isOnElement.value = true;
    if (props.delay) {
        waiter.value = wait(props.delay);
        await waiter.value;
    }

    if (isOnElement.value) {
        isVisible.value = true;
        await popperInstance?.update();
    }
}

async function hideToolTip() {
    waiter.value?.cancel?.();
    isOnElement.value = false;

    if (props.keepAliveOnContent) {
        await wait(200);
        if (isOnElement.value) {
            return;
        }
    }
    isVisible.value = false;
}

watch(
    () => props.keepAliveOnContent,
    () => {
        if (props.keepAliveOnContent && !hasKeepAliveEvents) {
            (content.value as any).addEventListener("mouseenter", showToolTip);
            (content.value as any).addEventListener("mouseleave", hideToolTip);
            hasKeepAliveEvents = true;
        }
    }
);

onMounted(() => {
    popperInstance = createPopper(toggle.value as any, content.value as any, {
        placement: props.direction,
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, props.offset]
                }
            }
        ]
    });

    (toggle.value as any).addEventListener("mouseenter", showToolTip);
    (toggle.value as any).addEventListener("mouseleave", hideToolTip);

    if (props.keepAliveOnContent && !hasKeepAliveEvents) {
        (content.value as any).addEventListener("mouseenter", showToolTip);
        (content.value as any).addEventListener("mouseleave", hideToolTip);
        hasKeepAliveEvents = true;
    }
});

onBeforeUnmount(() => {
    popperInstance?.destroy();
    popperInstance = null;

    (toggle.value as any).removeEventListener("mouseenter", showToolTip);
    (toggle.value as any).removeEventListener("mouseleave", hideToolTip);

    (content.value as any).removeEventListener("mouseenter", showToolTip);
    (content.value as any).removeEventListener("mouseleave", hideToolTip);
});
</script>

<style>
.et-sdk-tooltip-wrapper--tooltip {
    background-color: var(--et-sdk-dark-600);
    color: var(--et-sdk-dark-50);
    border-radius: 99999px;
    line-height: initial;
    padding: 4px 16px;
    font-size: var(--et-sdk-font-size-tiny);
    box-shadow: var(--et-sdk-shadow-normal);

    z-index: 1000;
}
</style>
