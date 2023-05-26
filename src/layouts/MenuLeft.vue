<template>
    <div class="flex flex-row h-full">
        <EtVerticalMenu>
            <template #default="scope">
                <slot name="menu" v-bind="scope"></slot>
            </template>
        </EtVerticalMenu>
        <div class="grow p-4">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import EtVerticalMenu from "../components/etMenu/EtVerticalMenu.vue";
</script>
