<template>
    <EtVerticalMenu class="w-72">
        <slot name="menu"></slot>
    </EtVerticalMenu>
    <main class="ml-72 p-4">
        <slot></slot>
    </main>
</template>

<script setup>
import EtVerticalMenu from "../components/EtVerticalMenu.vue";
</script>
