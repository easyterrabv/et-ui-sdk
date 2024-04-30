<template>
    <div class="et-sdk-form-group">
        <EtLabel v-if="$slots.label">
            <slot name="label"></slot>
        </EtLabel>
        <EtInputGroup
            class="et-sdk-form-group--input-group"
            v-if="$slots.default"
        >
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

.et-sdk-form-group {
    /* if there is a alert in the "after" section */
    .et-sdk-alert {
        width: 100%;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        margin-top: -5px;
    }
}
</style>
