<template>
    <div>
        <EtLabel>
            <slot name="label"></slot>
        </EtLabel>
        <EtInputGroup class="w-full">
            <slot></slot>
        </EtInputGroup>
    </div>
</template>

<script>
import { defineComponent } from "vue-demi";

import EtLabel from "../EtLabel.vue";
import EtInputGroup from "./EtInputGroup.vue";

export default defineComponent({
    components: {
        EtLabel,
        EtInputGroup
    }
});
</script>
