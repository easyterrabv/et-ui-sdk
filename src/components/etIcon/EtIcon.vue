<template>
    <FontAwesomeIcon
        class="et-sdk-icon"
        fixed-width
        v-bind="{ ...$props, ...$attrs }"
        :icon="['fas', icon]"
    ></FontAwesomeIcon>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue";

export default defineComponent({
    components: { FontAwesomeIcon },
    props: {
        icon: {
            required: true,
            type: String
        }
    }
});
</script>
