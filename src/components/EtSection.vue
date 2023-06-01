<template>
    <div class="et-section p-0">
        <EtHeaderBlock
            class="et-section-header bg-slate-50 text-lg h-12 !border-b-0"
            v-if="$slots.header"
        >
            <slot name="header"></slot>
        </EtHeaderBlock>
        <slot name="tabs"></slot>
        <div class="et-section-body p-4" v-if="$slots.default">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import EtHeaderBlock from "src/components/EtHeaderBlock.vue";
import { defineComponent } from "vue-demi";

export default defineComponent({
    components: {
        EtHeaderBlock
    }
});
</script>
