<template>
    <span class="et-sdk-tooltip-wrapper">
        <span class="et-sdk-tooltip--toggle" ref="toggle">
            <slot></slot>
        </span>
        <Teleport to="body">
            <div
                ref="content"
                v-show="isVisible"
                class="et-sdk-tooltip--content et-sdk-tooltip-wrapper--tooltip no-wrap"
            >
                <slot name="tooltip"></slot>
            </div>
        </Teleport>
    </span>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { createPopper } from "@popperjs/core";
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import type { Placement } from "@popperjs/core/lib/enums";
import type { Instance } from "@popperjs/core/lib/types";

const props = defineProps({
    direction: {
        type: String as PropType<Placement>,
        required: false,
        default: "bottom"
    }
});

const toggle = ref(null);
const content = ref(null);
const isVisible = ref(false);

let popperInstance: Instance;

async function showToolTip() {
    isVisible.value = true;
    await popperInstance?.update();
}

function hideToolTip() {
    isVisible.value = false;
}

onMounted(() => {
    popperInstance = reactive(
        createPopper(toggle.value as any, content.value as any, {
            placement: props.direction
        })
    );

    (toggle.value as any).addEventListener("mouseenter", showToolTip);
    (toggle.value as any).addEventListener("mouseleave", hideToolTip);
});

onBeforeUnmount(() => {
    (toggle.value as any).removeEventListener("mouseenter", showToolTip);
    (toggle.value as any).removeEventListener("mouseleave", hideToolTip);
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
