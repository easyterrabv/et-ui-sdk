<template>
    <font-awesome-layers
        class="et-icon-layers"
        fixed-width
        v-bind="{ ...$props, ...$attrs }"
    >
        <slot></slot>
    </font-awesome-layers>
</template>

<script lang="ts">
import { FontAwesomeLayers } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue";
export default defineComponent({
    components: { FontAwesomeLayers }
});
</script>
