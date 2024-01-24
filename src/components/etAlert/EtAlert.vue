<template>
    <div class="et-sdk-alert" :class="['et-sdk-alert__' + type]">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { UI_TYPES } from "../../helpers/enums";

export default defineComponent({
    props: {
        type: {
            required: false,
            type: String as PropType<UI_TYPES>,
            default: UI_TYPES.DEFAULT
        }
    }
});
</script>

<style>
.et-sdk-alert {
    width: fit-content;
    max-width: 100%;

    border-radius: 8px;
    font-weight: var(--et-sdk-font-weight-normal);
    font-size: var(--et-sdk-font-size-normal-s);
    padding: 11px 11px;
    line-height: 16px;

    background-color: var(--et-sdk-dark-100);
    color: var(--et-sdk-dark-800);
}

.et-sdk-alert__primary {
    background-color: var(--et-sdk-blue-50);
}

.et-sdk-alert__success {
    background-color: var(--et-sdk-success-100);
}

.et-sdk-alert__danger {
    background-color: var(--et-sdk-danger-100);
}

.et-sdk-alert__warning {
    background-color: var(--et-sdk-warning-100);
}
</style>
