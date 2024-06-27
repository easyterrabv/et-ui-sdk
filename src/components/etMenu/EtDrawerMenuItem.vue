<template>
    <div
        class="et-sdk-drawer-menu-item"
        :class="{ 'et-sdk-drawer-menu-item--active': active }"
    >
        <div class="et-sdk-drawer-menu-item__icon-wrapper">
            <slot name="icon">
                <EtIconStar />
            </slot>
        </div>
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import EtIconStar from "../etIcon/EtIconStar.vue";

defineProps({
    active: Boolean
});
</script>

<style>
.et-sdk-drawer-menu-item {
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    cursor: pointer;

    font-size: var(--et-sdk-font-size-small);

    &:hover .et-sdk-drawer-menu-item__icon-wrapper {
        background-color: var(--et-sdk-blue-700);
        color: white;
    }
}

.et-sdk-drawer-menu-item__icon-wrapper {
    width: 38px;
    height: 38px;
    font-size: 18px;
    line-height: 38px;

    border-radius: 7px;

    transition:
        100ms ease-in-out background-color,
        100ms ease-in-out color;
}

.et-sdk-drawer-menu-item--active .et-sdk-drawer-menu-item__icon-wrapper {
    background-color: var(--et-sdk-blue-600);
    color: white;
}
</style>
