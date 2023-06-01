<template>
    <EtBox class="et-card !p-0">
        <EtSection>
            <template #header>
                <slot name="header"></slot>
            </template>
            <slot></slot>
        </EtSection>
    </EtBox>
</template>

<script lang="ts">
import EtBox from "src/components/EtBox.vue";
import EtSection from "src/components/EtSection.vue";
import { defineComponent } from "vue-demi";

export default defineComponent({
    components: {
        EtBox,
        EtSection
    }
});
</script>
