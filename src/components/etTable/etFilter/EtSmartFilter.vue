<template>
    <div class="et-sdk-smart-filter">
        <div class="et-sdk-smart-filter--label">
            <slot name="label"></slot>
        </div>
        <div class="et-sdk-smart-filter--filter">
            <EtInputGroup>
                <slot></slot>
            </EtInputGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtInputGroup from "../../etForm/EtInputGroup.vue";
</script>

<style>
.et-sdk-smart-filter {
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
}

.et-sdk-smart-filter--label {
    width: 25%;
    line-height: 32px;
}

.et-sdk-smart-filter--filter {
    flex-grow: 1;
}
</style>
