<template>
    <div
        class="flex flex-row font-semibold text-2xl border-b-2 border-slate-100 h-16"
    >
        <div class="grow px-4 flex items-center">
            <slot></slot>
        </div>
        <div v-if="$slots.actions" class="px-4 flex items-center">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script setup lang="ts"></script>
