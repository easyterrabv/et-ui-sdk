<template>
    <div class="et-sdk-layout-menu-top">
        <slot name="pre"></slot>
        <EtTopBar>
            <slot name="top"></slot>
            <template #end>
                <slot name="topEnd"></slot>
            </template>
        </EtTopBar>
        <div class="et-sdk-layout-menu-top--content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtTopBar from "../components/etMenu/EtTopBar.vue";
</script>

<style>
.et-sdk-layout-menu-top {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;

    display: flex;
    flex-direction: column;
}

.et-sdk-layout-menu-top--content {
    flex-grow: 1;
    height: 100%;
    max-height: 100%;
    overflow: auto;
}
</style>
