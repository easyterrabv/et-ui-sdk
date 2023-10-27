<template>
    <div class="et-sdk-box">
        <slot></slot>
    </div>
</template>

<script setup lang="ts"></script>

<style>
.et-sdk-box {
    box-shadow: var(--et-sdk-shadow-normal);
    background-color: var(--et-sdk-light-0);
    padding: 15px;
}
</style>
