<template>
    <label
        class="et-sdk-checkbox-with-label"
        :class="{
            'et-sdk-checkbox-with-label--disabled': props.disabled
        }"
        @click="handleOnClick"
    >
        <EtCheckBox v-bind="$attrs" ref="checkbox" :disabled="props.disabled" />
        <slot />
    </label>
</template>

<script setup lang="ts">
import EtCheckBox from "./EtCheckbox.vue";
import { ref } from "vue";

defineOptions({
    inheritAttrs: false
});

const props = defineProps({
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
});

const checkbox = ref<typeof EtCheckBox | null>(null);

function handleOnClick() {
    if (!checkbox.value) {
        return;
    }

    checkbox.value.handleOnClick();
}
</script>

<style>
.et-sdk-checkbox-with-label {
    display: flex;
    align-items: center;
    gap: 8px;
    user-select: none;
    cursor: pointer;
}

.et-sdk-checkbox-with-label--disabled {
    cursor: not-allowed;
}
</style>
