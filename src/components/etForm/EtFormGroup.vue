<template>
    <div class="et-sdk-form-group">
        <EtLabel>
            <slot name="label"></slot>
        </EtLabel>
        <EtInputGroup class="et-sdk-form-group--input-group">
            <slot></slot>
        </EtInputGroup>
        <div v-if="$slots.after" class="mt-2">
            <slot name="after"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import EtLabel from "../etText/EtLabel.vue";
import EtInputGroup from "./EtInputGroup.vue";

export default defineComponent({
    components: {
        EtLabel,
        EtInputGroup
    }
});
</script>

<style>
.et-sdk-form-group--input-group {
    width: 100%;
}
</style>
