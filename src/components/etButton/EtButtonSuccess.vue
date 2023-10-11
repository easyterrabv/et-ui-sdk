<template>
    <EtButton
        class="et-button-success"
        v-bind="{ ...$props, ...$attrs }"
        :type="UI_TYPES.SUCCESS"
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
