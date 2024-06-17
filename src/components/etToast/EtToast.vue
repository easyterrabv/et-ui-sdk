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
            :toast="toast"
        />
        <template v-else-if="toast.options.content?.text">
            <div class="et-sdk-toast__content">
                <component
                    v-if="toast.options.content?.iconComponent"
                    :is="toast.options.content.iconComponent"
                />
                <div class="et-sdk-toast__content__text">
                    {{ toast.options.content.text }}
                </div>
                <EtIconTimes
                    class="et-sdk-toast__content__dismiss"
                    v-if="toast.options.content.dismissible"
                    @click="toast.remove"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import type { IEtActiveToast } from "../etProvider/EtToastProviderInterfaces";
import type { PropType } from "vue";

import EtIconTimes from "../etIcon/EtIconTimes.vue";

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
    pointer-events: all;
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

.et-sdk-toast__content {
    display: flex;
    align-items: center;
    gap: 8px;

    .et-sdk-toast__content__dismiss {
        cursor: pointer;
    }

    .et-sdk-toast__content__text {
        flex-grow: 1;
    }
}
</style>
