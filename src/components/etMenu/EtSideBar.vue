<template>
    <aside
        v-if="$slots.default"
        :class="{
            'et-sdk-side-bar--closed': isCollapsed,
            'et-sdk-side-bar--open': !isCollapsed
        }"
        class="et-sdk-side-bar"
    >
        <div class="et-sdk-side-bar__content hide-scrollbar">
            <slot :isCollapsed="isCollapsed" />
        </div>

        <div class="et-sdk-side-bar__footer">
            <slot name="footer" :isCollapsed="isCollapsed" />
            <div
                @mousedown.left.stop="toggleCollapse"
                class="et-sdk-side-bar--toggle"
            >
                <EtIconAnglesLeft
                    title="Hide Menu"
                    v-if="!isCollapsed"
                ></EtIconAnglesLeft>
                <EtIconAnglesRight title="Show Menu" v-else></EtIconAnglesRight>
            </div>
        </div>
    </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EtIconAnglesLeft from "../etIcon/EtIconAnglesLeft.vue";
import EtIconAnglesRight from "../etIcon/EtIconAnglesRight.vue";

const localStorageCollapsedKey: string = "etSideBarIsCollapsed";
function getIsCollapsed(key: string): boolean {
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
    watch: {
        isCollapsed: {
            immediate: true,
            handler() {
                this.$emit("isCollapsed", this.isCollapsed);
            }
        }
    },
    computed: {
        storageKey(): string {
            return [localStorageCollapsedKey, this.name]
                .filter((n) => !!n)
                .join("-");
        }
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
    },
    emits: ["isCollapsed"]
});
</script>

<style>
.et-sdk-side-bar {
    padding-top: 24px;
    z-index: 10;
    overflow-y: auto;
    height: 100%;
    max-height: 100%;
    background-color: var(--et-sdk-dark-50);
    box-shadow: var(--et-sdk-shadow-normal-inset);
    transition: width 150ms ease-in-out;
    width: var(--et-sdk-left-menu-width-closed);

    display: flex;
    flex-direction: column;
}

.et-sdk-side-bar--closed {
    width: var(--et-sdk-left-menu-width-closed);
}

.et-sdk-side-bar--open {
    width: var(--et-sdk-left-menu-width-open);
}

.et-sdk-side-bar__content {
    flex-grow: 1;
    overflow-y: auto;
}

.et-sdk-side-bar__footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.et-sdk-side-bar--toggle {
    padding: 16px;
    color: var(--et-sdk-dark-400);
    cursor: pointer;
}

.et-sdk-side-bar--toggle:hover {
    color: var(--et-sdk-dark-800);
}
</style>
