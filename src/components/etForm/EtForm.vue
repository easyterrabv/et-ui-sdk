<template>
    <form
        :method="method"
        @submit.prevent="(e) => debounceSubmit(e)"
        class="et-sdk-form"
    >
        <slot />
    </form>
</template>

<script lang="ts">
import { Debounce } from "../../helpers/debounce";

export default {
    props: {
        method: {
            type: String,
            required: false,
            default: "post"
        }
    },
    data() {
        return {
            handleSubmitDebounce: new Debounce(
                (...args) => this.handleSubmit(...args),
                50
            )
        };
    },
    methods: {
        debounceSubmit(e: Event) {
            e.preventDefault();
            this.handleSubmitDebounce.debounce();
        },
        handleSubmit() {
            this.$emit("submit");
        }
    },
    emits: {
        submit: () => true
    }
};
</script>

<style>
.et-sdk-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>
