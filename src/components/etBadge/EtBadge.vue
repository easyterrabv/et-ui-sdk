<template>
    <div
        class="et-sdk-badge"
        :class="['et-sdk-badge__' + type, 'et-sdk-badge__' + size]"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { UI_SIZING, UI_TYPES } from "../../helpers/enums";

export const sharedProps = {
    size: {
        required: false,
        type: String as PropType<UI_SIZING>,
        default: UI_SIZING.S
    }
};

export default defineComponent({
    props: {
        ...sharedProps,
        type: {
            required: false,
            type: String as PropType<UI_TYPES>,
            default: UI_TYPES.DEFAULT
        }
    }
});
</script>

<style>
.et-sdk-badge {
    border-radius: 4px;
    display: inline-block;
    font-weight: var(--et-sdk-font-weight-normal);

    /* default */
    background-color: var(--et-sdk-dark-50);
    color: initial;

    /* S size */
    font-size: var(--et-sdk-font-size-tiny);
    line-height: 16px;
    padding: 2px 8px;
}

.et-sdk-badge__primary {
    background-color: var(--et-sdk-blue-100);
    color: var(--et-sdk-blue-700);
}

.et-sdk-badge__success {
    background-color: var(--et-sdk-success-100);
    color: var(--et-sdk-success-700);
}

.et-sdk-badge__danger {
    background-color: var(--et-sdk-danger-100);
    color: var(--et-sdk-red-600);
}

.et-sdk-badge__warning {
    background-color: var(--et-sdk-warning-100);
    color: var(--et-sdk-warning-700);
}

.et-sdk-badge__xs {
    font-size: var(--et-sdk-font-size-tiny);
    line-height: 16px;
    padding: 2px 4px;
}

.et-sdk-badge__m {
    font-size: var(--et-sdk-font-size-small);
    line-height: 16px;
    padding: 4px 12px;
}

.et-sdk-badge__l {
    font-size: var(--et-sdk-font-size-small);
    line-height: 16px;
    padding: 6px 16px;
}
</style>
