<template>
    <form
        :method="method"
        :onsubmit="onsubmit"
        @keyup.enter.stop="$emit('submit')"
    >
        <slot />
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";

export default defineComponent({
    props: {
        method: {
            type: String,
            required: false,
            default: "post"
        },
        onsubmit: {
            type: Function,
            required: false,
            default() {
                return () => false;
            }
        }
    },
    emits: {
        submit: () => true
    }
});
</script>
