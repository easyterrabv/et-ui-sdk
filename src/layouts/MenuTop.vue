<template>
    <div class="w-full h-full flex flex-col max-h-full max-w-full">
        <EtTopBar>
            <slot name="top"></slot>
            <template #end>
                <slot name="topEnd"></slot>
            </template>
        </EtTopBar>
        <div class="grow h-full max-h-full overflow-auto">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

import EtFull from "src/layouts/Full.vue";
import EtTopBar from "src/components/etMenu/EtTopBar.vue";

export default defineComponent({
    components: {
        EtFull,
        EtTopBar
    }
});
</script>
