<template>
    <textarea
        :name="name"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :placeholder="placeholder"
        v-model="internalData"
        class="et-textarea block w-full rounded-md border-0 p-2 focus-visible:ring-0 focus-visible:ring-offset-0 text-text shadow-sm ring-1 ring-default-light placeholder:text-text-light focus:ring-1 focus:ring-primary transition-colors duration-200 ease-in-out"
        :class="{
            'bg-default-extra-light cursor-not-allowed': disabled
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
            internalData: null as null | string
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
