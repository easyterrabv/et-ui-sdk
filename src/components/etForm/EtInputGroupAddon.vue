<template>
    <label
        :class="{
            'et-sdk-input-group-addon__xs': UI_SIZING.XS === size,
            'et-sdk-input-group-addon__s': UI_SIZING.S === size,
            'et-sdk-input-group-addon__m': UI_SIZING.M === size,
            'et-sdk-input-group-addon__l': UI_SIZING.L === size
        }"
        class="et-sdk-input-group-addon"
    >
        <slot></slot>
    </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { UI_SIZING } from "../../helpers/enums";

export default defineComponent({
    props: {
        size: {
            required: false,
            type: String,
            default: UI_SIZING.M
        }
    },
    data() {
        return {
            UI_SIZING
        };
    }
});
</script>

<style>
.et-sdk-input-group-addon {
    display: flex;
    align-items: center;
    border-radius: var(--et-sdk-input-border-radius);
    border: 1px solid var(--et-sdk-dark-300);
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal);
    line-height: 24px;
    color: var(--et-sdk-dark-800);
    white-space: nowrap;
    background-color: var(--et-sdk-dark-50);
}

.et-sdk-input-group-addon:not(:first-child) {
    border-left: none;
}

.et-sdk-input-group-addon:not(:last-child) {
    border-right: none;
}

.et-sdk-input-group-addon__xs {
    padding: 2px 6px;
}

.et-sdk-input-group-addon__s {
    padding: 4px 10px;
}

.et-sdk-input-group-addon__m {
    padding: 8px 14px;
}

.et-sdk-input-group-addon__l {
    padding: 12px 18px;
}
</style>
