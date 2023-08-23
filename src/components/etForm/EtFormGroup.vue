<template>
    <div>
        <EtLabel>
            <slot name="label"></slot>
        </EtLabel>
        <EtInputGroup class="!w-full">
            <slot></slot>
        </EtInputGroup>
        <div v-if="$slots.after" class="mt-2">
            <slot name="after"></slot>
        </div>
    </div>
</template>

<script>
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
