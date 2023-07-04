<template>
    <EtBadge
        class="et-badge-success"
        v-bind="{ ...$props, ...$attrs }"
        :type="UI_TYPES.SUCCESS"
    >
        <slot></slot>
    </EtBadge>
</template>

<script lang="ts">
import EtBadge, { sharedProps } from "./EtBadge.vue";
import { defineComponent } from "vue-demi";
import { UI_TYPES } from "../../enums";
import EtAlert from "../etAlert/EtAlert.vue";

export default defineComponent({
    computed: {
        UI_TYPES() {
            return UI_TYPES;
        }
    },
    components: { EtAlert, EtBadge },
    props: sharedProps
});
</script>
