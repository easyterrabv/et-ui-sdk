<template>
    <FontAwesomeIcon
        class="et-sdk-icon"
        fixed-width
        v-bind="{ ...$props, ...$attrs }"
        :icon="[prefix, icon]"
    ></FontAwesomeIcon>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent, type PropType } from "vue";
import type { IconPrefix } from "@fortawesome/fontawesome-common-types";

export default defineComponent({
    components: { FontAwesomeIcon },
    props: {
        prefix: {
            required: false,
            type: String as PropType<IconPrefix>,
            default: "fas"
        },
        icon: {
            required: true,
            type: String
        }
    }
});
</script>
