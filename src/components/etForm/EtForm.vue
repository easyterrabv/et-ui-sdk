<template>
    <form
        :method="method"
        onsubmit="return false;"
        @submit.stop.prevent=""
        @keyup.enter.stop.prevent="$emit('submit')"
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
        }
    },
    emits: {
        submit: () => true
    }
});
</script>
