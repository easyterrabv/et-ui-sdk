<template>
    <div class="et-sdk-data-grid__row et-sdk-data-grid__content-loading-row">
        <span>
            <EtIconSpinner pulse></EtIconSpinner>
            Loading
        </span>
    </div>
</template>

<script setup lang="ts">
import EtIconSpinner from "../../etIcon/EtIconSpinner.vue";
</script>

<style>
.et-sdk-data-grid__content-loading-row {
    width: 100%;
    max-width: 100vw;
    text-align: center;
    font-size: var(--et-sdk-font-size-extra-large);
    line-height: 28px;
    padding: 16px;
    display: inline-block !important;
    border: none !important;
}
</style>
