<template>
    <div class="et-sdk-popover">
        <div
            :tabindex="-1"
            ref="toggle"
            @click="(e) => !manual && toggleDropdown()"
        >
            <slot name="toggle" :togglePopover="() => toggleDropdown()"></slot>
        </div>
        <Teleport to="body">
            <div
                ref="content"
                class="et-sdk-popover__popover"
                v-show="isVisible"
                @click="(e) => !manual && hideDropDown()"
                @keyup.esc="hideDropDown"
            >
                <slot></slot>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import {
    inject,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    type PropType,
    watch
} from "vue";
import {
    EtOverlayEvent,
    type IEtOverlayProvide
} from "./etProvider/EtOverlayProviderInterfaces";
import { type Instance } from "@popperjs/core/lib/types";
import { createPopper } from "@popperjs/core";
import { type Placement } from "@popperjs/core/lib/enums";
import { isElementOrParentEqualTo } from "../helpers/random";

const props = defineProps({
    placement: {
        type: String as PropType<Placement>,
        default: "bottom-start"
    },
    manual: {
        type: Boolean,
        default: false
    },
    fitToggle: {
        type: Boolean,
        default: false
    }
});

const sdkOverlay = inject<IEtOverlayProvide>("SDKOverlayProvide");

const toggle = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const hasEvent = ref(false);
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

    if (!hasEvent.value) {
        window.addEventListener("mouseup", handleClickOutside);
        hasEvent.value = true;
    }
}

async function isOpen() {
    return isVisible.value;
}

function hideDropDown() {
    isVisible.value = false;
    sdkOverlay?.setVisibility(false);

    try {
        window.removeEventListener("mouseup", handleClickOutside);
        hasEvent.value = false;
    } catch (e) {}
}

function hideDropDownEvent() {
    if (props.manual) {
        return;
    }

    hideDropDown();
}

function handleClickOutside(e: MouseEvent) {
    const isSelf = isElementOrParentEqualTo(
        e.target as HTMLElement,
        content.value
    );

    if (isSelf) {
        return;
    }

    emits("clickedNext");

    if (isVisible.value) {
        hideDropDownEvent();
    }
}

function calculateToggleWidth() {
    if (toggle.value) {
        return toggle.value.offsetWidth;
    }
    return 0;
}
watch(
    () => {
        return {
            toggle: props.fitToggle,
            isVisible: isVisible.value
        };
    },
    () => {
        if (props.fitToggle && content.value) {
            (content.value as HTMLElement).style.width =
                `${calculateToggleWidth()}px`;
        }
    },
    { immediate: true }
);

watch(
    () => isVisible.value,
    (newValue) => {
        if (newValue) {
            emits("open");
        } else {
            emits("hide");
        }
    }
);

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
    sdkOverlay?.addEvent(EtOverlayEvent.onClick, hideDropDownEvent);
});

onBeforeUnmount(() => {
    popperInstance?.destroy();
    popperInstance = null;
    sdkOverlay?.removeEvent(EtOverlayEvent.onClick, hideDropDownEvent);
    try {
        window.removeEventListener("mouseup", handleClickOutside);
    } catch (e) {}
});

defineExpose({
    showDropDown,
    hideDropDown,
    toggleDropdown,
    isOpen
});

const emits = defineEmits(["open", "hide", "clickedNext"]);
</script>

<style>
.et-sdk-popover {
    display: inline-block;
}

.et-sdk-popover__popover {
    z-index: 13000;

    background-color: var(--et-sdk-light-0);
    border-radius: 5px;
    box-shadow: var(--et-sdk-shadow-normal);
}
</style>
