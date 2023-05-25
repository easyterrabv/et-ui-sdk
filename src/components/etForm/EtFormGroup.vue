<template>
    <EtInputLabel>
        <slot name="label"></slot>
    </EtInputLabel>
    <EtInputGroup>
        <slot></slot>
    </EtInputGroup>
</template>

<script>
import { defineComponent } from "vue-demi";

import EtInputLabel from "src/components/etForm/EtInputLabel.vue";
import EtInputGroup from "src/components/etForm/EtInputGroup.vue";

export default defineComponent({
    components: {
        EtInputLabel,
        EtInputGroup
    }
});
</script>
