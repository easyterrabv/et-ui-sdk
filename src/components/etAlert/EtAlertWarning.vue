<template>
    <EtAlert
        class="et-alert-warning"
        v-bind="{ ...$props, ...$attrs }"
        :type="UI_TYPES.WARNING"
    >
        <slot></slot>
    </EtAlert>
</template>

<script lang="ts">
import EtAlert from "./EtAlert.vue";
import { defineComponent } from "vue-demi";
import { UI_TYPES } from "../../enums";

export default defineComponent({
    computed: {
        UI_TYPES() {
            return UI_TYPES;
        }
    },
    components: { EtAlert }
});
</script>
