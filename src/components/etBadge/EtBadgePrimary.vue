<template>
    <EtBadge
        class="et-badge-primary"
        v-bind="$props"
        v-on="$listeners"
        :type="UI_TYPES.PRIMARY"
    >
        <slot></slot>
    </EtBadge>
</template>

<script lang="ts">
import EtBadge, { sharedProps } from "./EtBadge.vue";
import { defineComponent } from "vue-demi";
import { UI_TYPES } from "../../enums";

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
