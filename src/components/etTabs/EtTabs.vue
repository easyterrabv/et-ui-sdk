<template>
    <div class="et-sdk-tabs bg-slate-50 flex flex-row">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style>
.et-sdk-tabs {
    background-color: var(--et-sdk-dark-100);
    display: flex;
    flex-direction: row;
    gap: 10px;

    padding-left: 5px;
    padding-right: 5px;
}
</style>
