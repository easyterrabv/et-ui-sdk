<template>
    <slot />
    <div
        v-show="isVisible"
        class="et-sdk-overlay-provider"
        :class="{
            'et-sdk-overlay-provider__is-transparent': isTransparent
        }"
        @click="() => handleEvent(EtOverlayEvent.onClick)"
    />
</template>

<script lang="ts" setup>
import { provide, ref } from "vue";
import {
    EtOverlayEvent,
    type IEtOverlayProvide
} from "./EtOverlayProviderInterfaces";

const isVisible = ref(false);
const isTransparent = ref(false);

// Doesn't need to be reactive. There are no watchers/computed's and is not rendered in dom
const events = new Map<EtOverlayEvent, Array<() => void>>();

function setVisibility(visibility: boolean) {
    isVisible.value = visibility;
    handleEvent(visibility ? EtOverlayEvent.onShow : EtOverlayEvent.onHide);
}

function handleEvent(e: EtOverlayEvent) {
    (events.get(e) || []).forEach((cb) => cb?.());
}

provide<IEtOverlayProvide>("SDKOverlayProvide", {
    setTransparency(transparency) {
        isTransparent.value = transparency || false;
    },
    setVisibility,
    toggle: () => setVisibility(!isVisible.value),
    addEvent(event, callback) {
        if (!events.has(event)) {
            events.set(event, []);
        }

        const _events = events.get(event) || [];
        if (!_events.includes(callback)) {
            _events.push(callback);
        }
    },
    removeEvent(event, callback) {
        const _events = events.get(event) || [];
        events.set(
            event,
            _events.filter((cb) => cb !== callback)
        );
    }
});
</script>

<style>
.et-sdk-overlay-provider {
    position: fixed;
    left: 0;
    top: 0;
    height: 100dvh;
    width: 100dvw;

    background-color: var(--et-sdk-dark-900);
    opacity: 0.2;

    z-index: 20;
}

.et-sdk-overlay-provider__is-transparent {
    opacity: 0;
}
</style>
