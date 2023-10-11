<template>
    <EtAlert
        class="et-alert-default"
        v-bind="{ ...$props, ...$attrs }"
        :type="UI_TYPES.DEFAULT"
    >
        <slot></slot>
    </EtAlert>
</template>

<script lang="ts">
import EtAlert from "./EtAlert.vue";
import { defineComponent } from "vue";
import { UI_TYPES } from "../../helpers/enums";

export default defineComponent({
    computed: {
        UI_TYPES() {
            return UI_TYPES;
        }
    },
    components: { EtAlert }
});
</script>
