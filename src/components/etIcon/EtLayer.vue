<template>
    <font-awesome-layers
        class="et-sdk-icon-layers"
        fixed-width
        v-bind="{ ...$props, ...$attrs }"
    >
        <slot></slot>
    </font-awesome-layers>
</template>

<script setup lang="ts">
import { FontAwesomeLayers } from "@fortawesome/vue-fontawesome";
</script>
