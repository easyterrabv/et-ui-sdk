<template>
    <div class="et-sdk-et-dynamic-select">
        <EtPopover
            ref="popover"
            class="et-sdk-et-dynamic-select__options"
            fitToggle
            manual
            @clickedNext="hideToolTip"
        >
            <template #toggle>
                <div
                    class="et-sdk-et-dynamic-select__toggle"
                    ref="toggle"
                    @click="toggleInput"
                >
                    <slot name="toggle">
                        <EtButtonDefault @click="toggleInput">
                            <slot />
                        </EtButtonDefault>
                    </slot>
                </div>
            </template>

            <!-- can't use v-bind="props" because onOptionSelect will be turned into an Array -->
            <EtSelectDynamic
                ref="selectDynamic"
                :data-getter="dataGetter"
                :placeholder="placeholder"
                :onOptionSelect="handleOptionSelect"
                :multiple="multiple"
                :internalSelectedOption="internalSelectedOption"
                :selectedOption
            >
                <template #default="scope">
                    <slot name="option" :option="scope.option" />
                </template>
            </EtSelectDynamic>
        </EtPopover>
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
    ref,
    watch
} from "vue";
import {
    EtOverlayEvent,
    type IEtOverlayProvide
} from "../etProvider/EtOverlayProviderInterfaces";
import { OptionModel } from "../../models/Option";
import EtPopover from "../EtPopover.vue";
import { wait } from "../../helpers/async";

const selectDynamic = ref<typeof EtSelectDynamic>();
const toggle = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const sdkOverlay = inject<IEtOverlayProvide>("SDKOverlayProvide");

const popover = ref<typeof EtPopover | null>(null);

const props = defineProps({
    dataGetter: {
        type: Function as PropType<
            (searchInput: string) => Promise<OptionModel[]> | OptionModel[]
        >,
        required: true
    },
    placeholder: {
        type: String,
        default: "Filter Options"
    },
    onOptionSelect: {
        type: Function as PropType<
            (selectedOption: OptionModel | OptionModel[] | null) => void
        >,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    multiple: {
        type: Boolean,
        default: false
    },
    selectedOption: {
        type: [Object, Array] as PropType<OptionModel | OptionModel[]>,
        default: null
    }
});

const internalSelectedOption = ref<OptionModel | OptionModel[] | null>(null);

watch(
    () => props.selectedOption,
    () => {
        internalSelectedOption.value = props.selectedOption;
    },
    { immediate: true }
);

async function showToolTip() {
    if (props.disabled) {
        return;
    }

    popover.value?.showDropDown?.();
    isVisible.value = true;

    await wait(100);
    (selectDynamic?.value as typeof EtSelectDynamic).focusInput();
}

function hideToolTip() {
    isVisible.value = false;

    popover.value?.hideDropDown?.();
    props.multiple && props.onOptionSelect?.(internalSelectedOption.value);
}

async function toggleInput() {
    if (isVisible.value) {
        hideToolTip();
    } else {
        await showToolTip();
    }
}

async function handleOptionSelect(value: OptionModel | OptionModel[] | null) {
    if (!props.multiple) {
        hideToolTip();
        props.onOptionSelect?.(value);
    } else {
        internalSelectedOption.value = value;
    }
}

onMounted(() => {
    sdkOverlay?.addEvent(EtOverlayEvent.onClick, hideToolTip);
});

onBeforeUnmount(() => {
    sdkOverlay?.removeEvent(EtOverlayEvent.onClick, hideToolTip);
});
</script>

<style>
.et-sdk-et-dynamic-select__options {
    z-index: 13000;

    width: 100%;
}
</style>
