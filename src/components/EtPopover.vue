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
let popperInstance: Instance;
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
    await popperInstance.update();
}

async function isOpen() {
    return isVisible.value;
}

function hideDropDown() {
    isVisible.value = false;
    sdkOverlay?.setVisibility(false);
}

function hideDropDownEvent() {
    if (props.manual) {
        return;
    }

    hideDropDown();
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
            (
                content.value as HTMLElement
            ).style.width = `${calculateToggleWidth()}px`;
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
    popperInstance = reactive(
        createPopper(
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
        )
    );
    sdkOverlay?.addEvent(EtOverlayEvent.onClick, hideDropDownEvent);
});

onBeforeUnmount(() => {
    sdkOverlay?.removeEvent(EtOverlayEvent.onClick, hideDropDownEvent);
});

defineExpose({
    showDropDown,
    hideDropDown,
    toggleDropdown,
    isOpen
});

const emits = defineEmits(["open", "hide"]);
</script>

<style>
.et-sdk-popover {
    display: inline-block;
}

.et-sdk-popover__popover {
    z-index: 30;

    background-color: var(--et-sdk-light-0);
    border-radius: 5px;
    box-shadow: var(--et-sdk-shadow-normal);
}
</style>
