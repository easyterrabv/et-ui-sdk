<template>
    <div class="flex flex-row h-full">
        <EtSideBar>
            <template #default="scope">
                <slot name="menu" v-bind="scope"></slot>
            </template>
        </EtSideBar>
        <div class="grow p-4">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import EtSideBar from "../components/etMenu/EtSideBar.vue";
</script>
