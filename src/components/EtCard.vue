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
import EtBox from "./EtBox.vue";
import EtSection from "./EtSection.vue";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        EtBox,
        EtSection
    }
});
</script>
