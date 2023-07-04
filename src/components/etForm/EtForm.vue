<template>
    <form
        :method="method"
        onsubmit="return false;"
        @submit.stop.prevent="debounceSubmit"
        @keyup.enter.stop.prevent="debounceSubmit"
    >
        <slot />
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { Debounce } from "../../helpers/debounce";

export default defineComponent({
    props: {
        method: {
            type: String,
            required: false,
            default: "post"
        }
    },
    data() {
        return {
            handleSubmitDebounce: new Debounce(this.handleSubmit, 50)
        };
    },
    methods: {
        debounceSubmit() {
            this.handleSubmitDebounce.debounce();
        },
        handleSubmit() {
            this.$emit("submit");
        }
    },
    emits: {
        submit: () => true
    }
});
</script>
