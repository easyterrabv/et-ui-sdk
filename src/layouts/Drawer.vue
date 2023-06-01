<template>
    <div
        class="et-drawer-layout w-full max-w-full h-full max-h-full flex flex-row"
    >
        <div class="grow max-h-full overflow-auto flex flex-col">
            <slot></slot>
        </div>
        <div
            class="et-drawer w-96 transition-all drop-shadow bg-white ease-in-out duration-150"
            :class="{
                '!w-0': !drawerOpen
            }"
            v-if="$slots.drawer"
        >
            <slot v-if="drawerOpen" name="drawer"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

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
