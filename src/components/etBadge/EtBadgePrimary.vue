<template>
    <EtBadge
        class="et-badge-primary"
        v-bind="{ ...$props, ...$attrs }"
        :type="UI_TYPES.PRIMARY"
    >
        <slot></slot>
    </EtBadge>
</template>

<script lang="ts">
import EtBadge, { sharedProps } from "./EtBadge.vue";
import { defineComponent } from "vue";
import { UI_TYPES } from "../../helpers/enums";
import EtAlert from "../etAlert/EtAlert.vue";

export default defineComponent({
    computed: {
        UI_TYPES() {
            return UI_TYPES;
        }
    },
    components: { EtBadge },
    props: sharedProps
});
</script>
