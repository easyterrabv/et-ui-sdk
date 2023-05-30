<template>
    <aside
        :class="[widthClass]"
        class="et-side-bar pt-6 z-10 h-full bg-slate-50 fixed shadow-inner relative transition-[width] ease-in-out duration-150"
    >
        <div>
            <slot :isCollapsed="isCollapsed"></slot>
        </div>

        <div
            @mousedown.left.stop="toggleCollapse"
            class="absolute bottom-0 right-0 p-4 text-text-light hover:text-primary hover:cursor-pointer"
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

const localStorageCollapsedKey: string = "etSideBarIsCollapsed";
function getIsCollapsed(key): boolean {
    let isCollapsed: boolean = false;
    if (localStorage) {
        const isCollapsedInter = localStorage.getItem(key);
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
    props: {
        name: {
            type: String,
            required: false,
            default: null
        }
    },
    data(): {
        isCollapsed: boolean;
    } {
        return {
            isCollapsed: false
        };
    },
    computed: {
        widthClass: (ctx): string => (ctx.isCollapsed ? "w-14" : "w-56"),
        storageKey: (ctx): string =>
            [localStorageCollapsedKey, ctx.name].filter((n) => !!n).join("-")
    },
    methods: {
        toggleCollapse(): void {
            this.isCollapsed = !this.isCollapsed;
            localStorage.setItem(
                this.storageKey,
                JSON.stringify(this.isCollapsed)
            );
        },
        handleIsCollapsedStorageUpdate(event: StorageEvent): void {
            if (event.key === this.storageKey) {
                this.isCollapsed = getIsCollapsed(this.storageKey);
            }
        }
    },
    created(): void {
        this.isCollapsed = getIsCollapsed(this.storageKey);
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