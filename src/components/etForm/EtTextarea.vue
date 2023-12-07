<template>
    <textarea
        :name="name"
        :autocomplete="autocomplete ? 'off' : 'on'"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :placeholder="placeholder"
        v-model="internalData"
        class="et-sdk-textarea"
        :class="{
            'et-sdk-textarea__disabled': disabled
        }"
    />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { commonInputProps } from "./EtInput.vue";

export default defineComponent({
    model: {
        // backwards compatibility with vue2.x
        prop: "modelValue",
        event: "update:modelValue"
    },
    props: {
        ...commonInputProps,
        modelValue: {
            type: [String, Number],
            required: false,
            default: null
        }
    },
    data() {
        return {
            internalData: this.modelValue as string | undefined
        };
    },
    watch: {
        internalData: {
            immediate: true,
            handler(value) {
                this.$emit("update:modelValue", this.internalData);
            }
        }
    }
});
</script>

<style>
.et-sdk-textarea {
    display: block;
    width: 100%;
    border-radius: var(--et-sdk-input-border-radius);
    padding: 8px;
    border: 1px solid var(--et-sdk-dark-300);
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal);
    line-height: 24px;
    color: var(--et-sdk-dark-800);
}

.et-sdk-textarea__disabled {
    background-color: var(--et-sdk-dark-50);
    cursor: not-allowed;
}
</style>
