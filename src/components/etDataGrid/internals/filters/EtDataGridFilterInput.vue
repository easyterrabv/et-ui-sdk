<template>
    <div class="et-sdk-data-grid--filter-wrapper" v-if="hasFilterDefinitions">
        <div
            class="et-sdk-data-grid--filter-input et-sdk-input-like"
            ref="toggle"
            @click="toggleInput"
        >
            <div class="et-sdk-data-grid--filter-icon">
                <EtIconSearch />
            </div>
            <div class="et-sdk-data-grid--filter-content">Testing lol</div>
            <div class="et-sdk-data-grid--filter-icon">
                <EtIconTimes />
            </div>
        </div>

        <Teleport to="body">
            <div
                ref="content"
                v-show="isVisible"
                style="
                    z-index: 30;
                    border-radius: 15px;
                    background-color: white;
                    width: 500px;
                    height: 250px;
                "
                @click.stop=""
            >
                <div>This is some content</div>
            </div>
        </Teleport>
    </div>
</template>

<script lang="ts" setup>
import EtIconSearch from "../../../etIcon/EtIconSearch.vue";
import EtIconTimes from "../../../etIcon/EtIconTimes.vue";

import {
    inject,
    computed,
    ref,
    onMounted,
    reactive,
    onBeforeUnmount
} from "vue";
import type { FiltersProvide } from "../../interfaces/DataGridMethods";
import type { Instance } from "@popperjs/core/lib/types";
import { createPopper } from "@popperjs/core";
import type { IEtOverlayProvide } from "../../../etProvider/EtOverlayProviderInterfaces";
import { EtOverlayEvent } from "../../../etProvider/EtOverlayProviderInterfaces";

const filters = inject<FiltersProvide>("filters");
const sdkOverlay = inject<IEtOverlayProvide>("SDKOverlayProvide");

const hasFilterDefinitions = computed<boolean>(() => !!filters?.hasFilters());

const toggle = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const isVisible = ref<boolean>(false);
let popperInstance: Instance;

async function toggleInput() {
    if (isVisible.value) {
        await hideToolTip();
    } else {
        await showToolTip();
    }
}

async function showToolTip() {
    isVisible.value = true;
    sdkOverlay?.setTransparency(true);
    sdkOverlay?.setVisibility(true);
    await popperInstance?.update();
}

async function hideToolTip() {
    isVisible.value = false;
    sdkOverlay?.setVisibility(false);
}

onMounted(() => {
    popperInstance = reactive(
        createPopper(
            toggle.value as HTMLElement,
            content.value as HTMLElement,
            {
                placement: "bottom-start"
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
.et-sdk-data-grid--filter-wrapper {
    width: 60%;
}

.et-sdk-data-grid--filter-input {
    margin-top: 4px;
    line-height: 52px;
    box-shadow: none;
    background-color: var(--et-sdk-blue-50);

    display: flex;
    flex-direction: row;
    padding: 0;
}

.et-sdk-data-grid--filter-content {
    flex-grow: 1;
}

.et-sdk-data-grid--filter-icon {
    width: 52px;
    text-align: center;
    color: var(--et-sdk-dark-500);
}
</style>
