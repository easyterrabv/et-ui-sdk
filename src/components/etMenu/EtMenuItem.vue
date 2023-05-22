<template>
    <div class="et-menu-item group relative">
        <div
            class="flex flex-row w-full min-h-16 border-l-4 border-white-off text-grey bg-white-off"
            :class="[activeClass]"
        >
            <div
                class="mr-1 my-1 flex rounded hover:bg-white-dark w-full cursor-pointer transition-colors ease-in-out duration-300"
            >
                <div
                    class="pl-2 py-2 flex items-center"
                    :class="
                        isCollapsed
                            ? 'w-full mx-auto px-2 place-content-center'
                            : ''
                    "
                >
                    <slot name="icon">
                        <EtIconHouse />
                    </slot>
                </div>
                <div
                    class="et-menu-item-content grow leading-4 p-2"
                    :class="isCollapsed ? 'hidden' : ''"
                >
                    <slot></slot>
                </div>
                <div
                    class="pl-2 py-2 flex items-center"
                    v-if="$slots.submenu && !isCollapsed"
                    @mouseup.left.stop="isOpen = !isOpen"
                >
                    <EtIconChevronDown v-if="isOpen" />
                    <EtIconChevronLeft v-else />
                </div>
            </div>
        </div>
        <div
            :class="[collapsedSubMenuClass]"
            v-if="$slots.submenu && (isOpen || isCollapsed)"
        >
            <slot name="submenu"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import EtIconHouse from "../etIcon/EtIconHouse.vue";
import EtIconChevronDown from "../etIcon/EtIconChevronDown.vue";
import EtIconChevronLeft from "../etIcon/EtIconChevronLeft.vue";

export default defineComponent({
    components: {
        EtIconHouse,
        EtIconChevronDown,
        EtIconChevronLeft
    },
    props: {
        isActive: {
            type: Boolean,
            required: false,
            default: false
        },
        isCollapsed: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data(): {
        isOpen: boolean;
    } {
        return {
            isOpen: false
        };
    },
    computed: {
        activeClass: (ctx): string =>
            ctx.isActive ? "!border-primary text-primary !bg-white" : "",
        collapsedSubMenuClass: (ctx): string =>
            ctx.isCollapsed
                ? "absolute hidden group-hover:block drop-shadow-md top-0 left-full z-10 w-max"
                : "ml-2 border-l-2 border-white-dark"
    }
});
</script>
