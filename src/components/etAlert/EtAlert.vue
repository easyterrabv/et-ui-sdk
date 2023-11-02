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
    border-radius: 4px;
    font-weight: var(--et-sdk-font-weight-normal);
    padding: 6px 16px;
    box-shadow: var(--et-sdk-shadow-normal);

    background-color: var(--et-sdk-dark-100);
    border: 1px solid var(--et-sdk-dark-200);
    color: initial;
}

.et-sdk-alert__primary {
    background-color: var(--et-sdk-blue-300);
    color: var(--et-sdk-blue-700);
    border: 1px solid var(--et-sdk-blue-300);
}

.et-sdk-alert__success {
    background-color: var(--et-sdk-success-300);
    color: var(--et-sdk-success-700);
    border: 1px solid var(--et-sdk-success-300);
}

.et-sdk-alert__danger {
    background-color: var(--et-sdk-danger-300);
    color: var(--et-sdk-danger-700);
    border: 1px solid var(--et-sdk-danger-300);
}

.et-sdk-alert__warning {
    background-color: var(--et-sdk-warning-300);
    color: var(--et-sdk-warning-700);
    border: 1px solid var(--et-sdk-warning-300);
}
</style>
