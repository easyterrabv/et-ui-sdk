<template>
    <div class="flex flex-row max-w-full">
        <EtVerticalMenu>
            <template #default="scope">
                <slot name="menu" v-bind="scope"></slot>
            </template>
        </EtVerticalMenu>
        <main class="grow p-4">
            <slot></slot>
        </main>
    </div>
</template>

<script setup>
import EtVerticalMenu from "../components/etMenu/EtVerticalMenu.vue";
</script>
