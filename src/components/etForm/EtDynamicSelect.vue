<template>
    <div class="et-sdk-et-dynamic-select">
        <div
            class="et-sdk-et-dynamic-select__toggle"
            ref="toggle"
            @click="toggleInput"
        >
            <slot name="toggle">
                <EtButtonDefault @click.stop="toggleInput">
                    <slot />
                </EtButtonDefault>
            </slot>
        </div>
        <Teleport to="body">
            <div
                ref="content"
                class="et-sdk-et-dynamic-select__options"
                v-show="isVisible"
                @click.stop=""
                @keyup.esc="hideToolTip"
            >
                <!-- can't use v-bind="props" because onOptionSelect will be turned into an Array -->
                <EtSelectDynamic
                    ref="selectDynamic"
                    :data-getter="props.dataGetter"
                    :placeholder="props.placeholder"
                    :onOptionSelect="handleOptionSelect"
                >
                    <template #default="scope">
                        <slot name="option" :option="scope.option" />
                    </template>
                </EtSelectDynamic>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import EtButtonDefault from "../etButton/EtButtonDefault.vue";
import EtSelectDynamic from "../etSelect/EtSelectDynamic.vue";
import {
    inject,
    onBeforeUnmount,
    onMounted,
    type PropType,
    reactive,
    ref
} from "vue";
import {
    EtOverlayEvent,
    type IEtOverlayProvide
} from "../etProvider/EtOverlayProviderInterfaces";
import type { Instance } from "@popperjs/core/lib/types";
import { createPopper } from "@popperjs/core";
import { OptionModel } from "../../models/Option";

const selectDynamic = ref<typeof EtSelectDynamic>();
const toggle = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const sdkOverlay = inject<IEtOverlayProvide>("SDKOverlayProvide");
let popperInstance: Instance;

const props = defineProps({
    dataGetter: {
        type: Function as PropType<
            (searchInput: string) => Promise<OptionModel[]>
        >,
        required: true
    },
    placeholder: {
        type: String,
        default: "Filter Options"
    },
    onOptionSelect: {
        type: Function as PropType<(selectedOption: OptionModel) => void>,
        required: true
    }
});

async function showToolTip() {
    isVisible.value = true;
    sdkOverlay?.setTransparency(true);
    sdkOverlay?.setVisibility(true);
    await popperInstance?.update();
    (selectDynamic?.value as typeof EtSelectDynamic).focusInput();
}

function hideToolTip() {
    isVisible.value = false;
    sdkOverlay?.setVisibility(false);
}

async function toggleInput() {
    if (isVisible.value) {
        await hideToolTip();
    } else {
        await showToolTip();
    }
}

async function handleOptionSelect(option: OptionModel) {
    hideToolTip();
    props.onOptionSelect?.(option);
}

onMounted(() => {
    popperInstance = reactive(
        createPopper(
            toggle.value as HTMLElement,
            content.value as HTMLElement,
            {
                placement: "bottom-start",
                modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [0, 6]
                        }
                    }
                ]
            }
        )
    );

    sdkOverlay?.addEvent(EtOverlayEvent.onClick, hideToolTip);
});

onBeforeUnmount(() => {
    sdkOverlay?.removeEvent(EtOverlayEvent.onClick, hideToolTip);
});
</script>

<style>
.et-sdk-et-dynamic-select__options {
    z-index: 30;
}
</style>
