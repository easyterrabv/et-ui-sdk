<template>
    <EtBox class="et-sdk-card">
        <EtSection>
            <template #header>
                <slot name="header"></slot>
            </template>
            <slot></slot>
        </EtSection>
    </EtBox>
</template>

<script setup lang="ts">
import EtBox from "./EtBox.vue";
import EtSection from "./EtSection.vue";
</script>

<style>
.et-sdk-card {
    padding: 0 !important;
}
</style>
