<template>
    <aside
        :class="[widthClass]"
        class="et-vertical-menu z-10 h-screen bg-white-off fixed shadow-inner relative transition-[width] ease-in-out duration-150"
    >
        <slot :isCollapsed="isCollapsed"></slot>

        <div
            @mousedown.left.stop="toggleCollapse"
            class="absolute bottom-0 right-0 p-4 text-white-dark hover:text-primary hover:cursor-pointer"
        >
            <EtIconAnglesLeft
                title="Hide Menu"
                v-if="!isCollapsed"
            ></EtIconAnglesLeft>
            <EtIconAnglesRight title="Show Menu" v-else></EtIconAnglesRight>
        </div>
    </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import EtIconAnglesLeft from "../etIcon/EtIconAnglesLeft.vue";
import EtIconAnglesRight from "../etIcon/EtIconAnglesRight.vue";

const localStorageCollapsedKey: string = "etSideMenuIsCollapsed";
function getIsCollapsed(): boolean {
    let isCollapsed: boolean = false;
    if (localStorage) {
        const isCollapsedInter = localStorage.getItem(localStorageCollapsedKey);
        isCollapsed = isCollapsedInter
            ? JSON.parse(isCollapsedInter)
            : isCollapsed;
    }
    return isCollapsed;
}

export default defineComponent({
    components: {
        EtIconAnglesLeft,
        EtIconAnglesRight
    },
    data(): {
        isCollapsed: boolean;
    } {
        return {
            isCollapsed: getIsCollapsed()
        };
    },
    computed: {
        widthClass: (ctx): string => (ctx.isCollapsed ? "w-14" : "w-56")
    },
    methods: {
        toggleCollapse(): void {
            this.isCollapsed = !this.isCollapsed;
            localStorage.setItem(
                localStorageCollapsedKey,
                JSON.stringify(this.isCollapsed)
            );
        },
        handleIsCollapsedStorageUpdate(event: StorageEvent): void {
            if (event.key === localStorageCollapsedKey) {
                this.isCollapsed = getIsCollapsed();
            }
        }
    },
    created(): void {
        window.addEventListener("storage", this.handleIsCollapsedStorageUpdate);
    },
    beforeUnmount(): void {
        window.removeEventListener(
            "storage",
            this.handleIsCollapsedStorageUpdate
        );
    }
});
</script>
