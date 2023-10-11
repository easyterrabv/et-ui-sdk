<template>
    <div class="flex flex-row h-full max-h-full">
        <EtSideBar @isCollapsed="(v) => (isCollapsed = v)" v-if="$slots.menu">
            <template #default="scope">
                <slot name="menu" v-bind="scope"></slot>
            </template>
        </EtSideBar>
        <div
            class="grow"
            :class="{
                'max-w-[calc(100%-14rem)]': !isCollapsed && $slots.menu,
                'max-w-[calc(100%-3.5rem)]': isCollapsed && $slots.menu,
                'max-w-full': !$slots.menu
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
