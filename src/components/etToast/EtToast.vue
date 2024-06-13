<template>
    <div
        class="et-sdk-toast"
        :class="{
            'et-sdk-toast--default': toast.options.content?.style === 'default',
            'et-sdk-toast--success': toast.options.content?.style === 'success',
            'et-sdk-toast--warning': toast.options.content?.style === 'warning',
            'et-sdk-toast--error': toast.options.content?.style === 'error'
        }"
    >
        <component
            v-if="toast.options.component"
            :is="toast.options.component"
        />
        <template v-else-if="toast.options.content?.text">
            {{ toast.options.content.text }}
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { IEtActiveToast } from "../etProvider/EtToastProviderInterfaces";
import type { PropType } from "vue";

defineProps({
    toast: {
        type: Object as PropType<IEtActiveToast>,
        required: true
    }
});
</script>

<style>
.et-sdk-toast {
    min-width: 312px;
    border-radius: 3px;
    padding: 12px;
    box-shadow: var(--et-sdk-shadow-normal);
}

.et-sdk-toast--default {
    background-color: var(--et-sdk-dark-800);
    color: var(--et-sdk-light-0);
}

.et-sdk-toast--success {
    background-color: var(--et-sdk-success-700);
    color: var(--et-sdk-light-0);
}

.et-sdk-toast--warning {
    background-color: var(--et-sdk-warning-500);
    color: var(--et-sdk-light-0);
}

.et-sdk-toast--error {
    background-color: var(--et-sdk-danger-500);
    color: var(--et-sdk-light-0);
}
</style>
