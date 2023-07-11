<template>
    <div class="flex flex-row h-full max-h-full">
        <EtSideBar @isCollapsed="(v) => (isCollapsed = v)">
            <template #default="scope">
                <slot name="menu" v-bind="scope"></slot>
            </template>
        </EtSideBar>
        <div
            class="grow"
            :class="{
                'max-w-[calc(100%-14rem)]': !isCollapsed,
                'max-w-[calc(100%-3.5rem)]': isCollapsed
            }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
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
