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
import { defineComponent, type PropType } from "vue";
import { UI_SIZING } from "../../helpers/enums";

export default defineComponent({
    props: {
        size: {
            required: false,
            type: String as PropType<UI_SIZING>,
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
    border-radius: 8px;
    border: 1px solid var(--et-sdk-dark-200);
    box-shadow: var(--et-sdk-shadow-normal);
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal);
    color: var(--et-sdk-dark-800);
    white-space: nowrap;
    background-color: var(--et-sdk-dark-50);
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
