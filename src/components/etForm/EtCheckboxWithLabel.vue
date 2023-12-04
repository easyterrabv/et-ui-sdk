<template>
    <label
        class="et-sdk-checkbox-with-label"
        :class="{
            'et-sdk-checkbox-with-label--disabled': disabled
        }"
        @click="handleOnClick"
    >
        <EtCheckBox v-bind="$attrs" ref="checkbox" />
        <slot />
    </label>
</template>

<script setup lang="ts">
import EtCheckBox from "./EtCheckbox.vue";
import { ref, watch } from "vue";

defineOptions({
    inheritAttrs: false
});

const checkbox = ref<typeof EtCheckBox | null>(null);

function handleOnClick() {
    if (!checkbox.value) {
        return;
    }

    checkbox.value.handleOnClick();
}

const disabled = ref(false);
watch(
    // Because props fall through and boolean props can have empty string value in $attrs
    // I decided to watch on the value inside the checkbox instead.
    // const attrs = useAttrs();
    // console.log(attrs.disabled); -> this would print empty string if <EtCheckboxWithLabel disabled />
    () => checkbox.value?.disabled,
    (value: boolean | undefined) => (disabled.value = !!value),
    { immediate: true }
);
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
