<template>
    <EtLabel>
        <slot name="label"></slot>
    </EtLabel>
    <EtInputGroup>
        <slot></slot>
    </EtInputGroup>
</template>

<script>
import { defineComponent } from "vue-demi";

import EtLabel from "src/components/EtLabel.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";

export default defineComponent({
    components: {
        EtLabel,
        EtInputGroup
    }
});
</script>
