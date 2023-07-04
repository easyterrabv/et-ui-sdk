<template>
    <EtAlert
        class="et-alert-danger"
        v-bind="{ ...$props, ...$attrs }"
        :type="UI_TYPES.DANGER"
    >
        <slot></slot>
    </EtAlert>
</template>

<script lang="ts">
import EtAlert from "./EtAlert.vue";
import { defineComponent } from "vue-demi";
import { UI_TYPES } from "../../enums";
import EtButton from "../etButton/EtButton.vue";

export default defineComponent({
    computed: {
        UI_TYPES() {
            return UI_TYPES;
        }
    },
    components: { EtButton, EtAlert }
});
</script>
