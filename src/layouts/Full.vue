<template>
    <div class="et-sdk-layout-full">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style>
.et-sdk-layout-full {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    overflow-x: hidden;
}
</style>
