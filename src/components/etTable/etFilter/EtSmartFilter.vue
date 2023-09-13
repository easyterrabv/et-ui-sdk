<template>
    <div class="flex flex-row gap-2 my-2">
        <div class="w-1/4 leading-8 text-default">
            <slot name="label"></slot>
        </div>
        <div class="flex-grow">
            <EtInputGroup>
                <slot></slot>
            </EtInputGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import EtInputGroup from "../../etForm/EtInputGroup.vue";
</script>
