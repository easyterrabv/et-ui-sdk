<template>
    <FontAwesomeIcon
        :icon="['fas', icon]"
        fixed-width
        :pulse="pulse"
        :title="title"
    ></FontAwesomeIcon>
</template>

<script lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue-demi";
export default defineComponent({
    components: { FontAwesomeIcon },
    props: {
        icon: {
            required: true,
            type: String
        },
        pulse: {
            required: false,
            type: Boolean,
            default: false
        },
        title: {
            required: false,
            type: String,
            default: null
        }
    }
});
</script>
