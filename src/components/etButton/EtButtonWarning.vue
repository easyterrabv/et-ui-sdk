<template>
    <EtButton
        class="et-sdk-button-warning"
        v-bind="{ ...$props, ...$attrs }"
        :type="UI_TYPES.WARNING"
    >
        <slot></slot>
    </EtButton>
</template>

<script lang="ts">
import EtButton, { sharedButtonProps } from "./EtButton.vue";
import { defineComponent } from "vue";
import { UI_TYPES } from "../../helpers/enums";

export default defineComponent({
    computed: {
        UI_TYPES() {
            return UI_TYPES;
        }
    },
    components: { EtButton },
    props: sharedButtonProps
});
</script>
