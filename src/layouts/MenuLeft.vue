<template>
    <div class="et-sdk-layout-menu-left">
        <EtSideBar @isCollapsed="(v) => (isCollapsed = v)" v-if="$slots.menu">
            <template #default="scope">
                <slot name="menu" v-bind="scope"></slot>
            </template>
        </EtSideBar>
        <div
            class="et-sdk-layout-menu-left--content"
            :class="{
                'et-sdk-layout-menu-left--content__open':
                    !isCollapsed && $slots.menu,
                'et-sdk-layout-menu-left--content__closed':
                    isCollapsed && $slots.menu,
                'et-sdk-layout-menu-left--content__no_menu': !$slots.menu
            }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import EtSideBar from "../components/etMenu/EtSideBar.vue";
export default {
    components: { EtSideBar },
    data() {
        return {
            isCollapsed: false
        };
    }
};
</script>

<style>
.et-sdk-layout-menu-left {
    display: flex;
    flex-direction: row;
    height: 100%;
    max-height: 100%;
}

.et-sdk-layout-menu-left--content {
    flex-grow: 1;
}

.et-sdk-layout-menu-left--content__open {
    max-width: calc(100% - var(--et-sdk-left-menu-width-open));
}

.et-sdk-layout-menu-left--content__closed {
    max-width: calc(100% - var(--et-sdk-left-menu-width-closed));
}

.et-sdk-layout-menu-left--content__no_menu {
    max-width: 100%;
}
</style>
