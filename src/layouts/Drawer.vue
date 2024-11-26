<template>
    <div class="et-sdk-layout-drawer">
        <div class="et-sdk-layout-drawer--main">
            <slot></slot>
        </div>
        <div
            class="et-sdk-layout-drawer--drawer"
            :class="{
                'et-sdk-layout-drawer--drawer-open': drawerOpen,
                'et-sdk-layout-drawer--drawer-closed': !drawerOpen
            }"
            v-if="$slots.drawer"
        >
            <slot v-if="drawerOpen" name="drawer" />
        </div>
        <div class="et-sdk-layout-drawer--drawer-menu" v-if="$slots.menu">
            <slot name="menu" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        drawerOpen: {
            type: Boolean,
            required: false,
            default: false
        }
    }
});
</script>

<style>
.et-sdk-layout-drawer {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;

    display: flex;
    flex-direction: row;
}

.et-sdk-layout-drawer--main {
    max-height: 100%;

    flex-grow: 1;
    overflow: auto;

    display: flex;
    flex-direction: column;

    container-name: content;
    container-type: inline-size;
}

.et-sdk-layout-drawer--drawer {
    width: var(--et-sdk-drawer-width);
    background-color: var(--et-sdk-light-0);
    box-shadow: var(--et-sdk-shadow-normal);
}

.et-sdk-layout-drawer--drawer-closed {
    width: 0;
}

.et-sdk-layout-drawer--drawer-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 70px;
    width: 70px;

    padding-left: 5px;
    padding-right: 5px;

    background-color: var(--et-sdk-dark-50);
    border-left: 1px solid var(--et-sdk-dark-200);
}
</style>
