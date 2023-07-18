<template>
    <section class="group/section et-sidebar-section">
        <EtLabel class="pb-1 flex flex-row">
            <span class="grow px-4" v-if="!isCollapsed"
                ><slot name="label"></slot
            ></span>
            <span
                class="cursor-pointer mx-2 px-2 rounded-full text-center hover:bg-white hover:text-primary"
                :class="[
                    {
                        grow: isCollapsed
                    }
                ]"
            >
                <slot name="action"></slot>
            </span>
        </EtLabel>
        <slot></slot>
        <div
            class="group-[:last-child]/section:border-0 et-sidebar-section-border-bottom border-b-[1px] border-b-slate-200 m-6"
        ></div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EtLabel from "../EtLabel.vue";

export default defineComponent({
    components: {
        EtLabel
    },
    props: {
        isCollapsed: {
            type: Boolean,
            required: false,
            default: false
        }
    }
});
</script>
