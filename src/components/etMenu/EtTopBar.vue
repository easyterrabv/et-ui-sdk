<template>
    <nav class="w-full h-14 bg-slate-800 px-4 py-2 flex flex-row align-middle">
        <div class="flex-grow flex place-items-center">
            <slot></slot>
        </div>
        <div class="flex place-items-center">
            <slot name="end"></slot>
        </div>
    </nav>
</template>

<script setup lang="ts"></script>
