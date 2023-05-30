<template>
    <EtBox class="et-card border-t-4 border-default-dark p-0">
        <div
            class="et-card-header p-4 bg-slate-50 border-b-2 border-default-slate-100 font-semibold"
            v-if="$slots.header"
        >
            <slot name="header"></slot>
        </div>
        <div class="et-card-body p-4" v-if="$slots.default">
            <slot></slot>
        </div>
    </EtBox>
</template>

<script lang="ts">
import EtBox from "src/components/EtBox.vue";
import { defineComponent } from "vue-demi";

export default defineComponent({
    components: {
        EtBox
    }
});
</script>
