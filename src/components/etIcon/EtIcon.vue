<template>
    <FontAwesomeIcon
        class="et-icon"
        fixed-width
        v-bind="{ ...$props, ...$attrs }"
        :icon="['fas', icon]"
    ></FontAwesomeIcon>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue";
import EtAlert from "../etAlert/EtAlert.vue";
export default defineComponent({
    components: { EtAlert, FontAwesomeIcon },
    props: {
        icon: {
            required: true,
            type: String
        }
    }
});
</script>
