<template>
    <div class="et-sdk-button-dropdown">
        <div ref="toggle">
            <EtButton
                class="et-sdk-button-dropdown__toggle"
                v-bind="{ ...$attrs }"
                @click="toggleDropdown"
            >
                <slot />
            </EtButton>
        </div>

        <Teleport to="body">
            <div
                ref="content"
                class="et-sdk-button-dropdown__dropdown"
                v-show="isVisible"
                @click="hideDropDown"
                @keyup.esc="hideDropDown"
            >
                <slot name="content" />
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import EtButton from "./EtButton.vue";
import {
    inject,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    type PropType
} from "vue";
import {
    EtOverlayEvent,
    type IEtOverlayProvide
} from "../etProvider/EtOverlayProviderInterfaces";
import { type Instance } from "@popperjs/core/lib/types";
import { createPopper } from "@popperjs/core";
import { type Placement } from "@popperjs/core/lib/enums";

defineOptions({
    inheritAttrs: false
});

const props = defineProps({
    placement: {
        type: String as PropType<Placement>,
        default: "bottom-start"
    }
});

const sdkOverlay = inject<IEtOverlayProvide>("SDKOverlayProvide");

const toggle = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isVisible = ref(false);
let popperInstance: Instance | null = null;
async function toggleDropdown() {
    if (isVisible.value) {
        hideDropDown();
    } else {
        await showDropDown();
    }
}

async function showDropDown() {
    isVisible.value = true;
    sdkOverlay?.setTransparency(true);
    sdkOverlay?.setVisibility(true);
    await popperInstance?.update();
}

function hideDropDown() {
    isVisible.value = false;
    sdkOverlay?.setVisibility(false);
}

onMounted(() => {
    popperInstance = createPopper(
        toggle.value as HTMLElement,
        content.value as HTMLElement,
        {
            placement: props.placement,
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, 6]
                    }
                },
                {
                    name: "flip",
                    options: {
                        fallbackPlacements: ["top"]
                    }
                }
            ]
        }
    );
    sdkOverlay?.addEvent(EtOverlayEvent.onClick, hideDropDown);
});

onBeforeUnmount(() => {
    popperInstance?.destroy();
    popperInstance = null;
    sdkOverlay?.removeEvent(EtOverlayEvent.onClick, hideDropDown);
});
</script>

<style>
.et-sdk-button-dropdown {
    display: inline-block;
}

.et-sdk-button-dropdown__dropdown {
    z-index: 13000;

    background-color: var(--et-sdk-light-0);
    border-radius: 5px;
    box-shadow: var(--et-sdk-shadow-normal);
}
</style>
