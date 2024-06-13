<template>
    <div class="et-sdk-toast">
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
    background-color: var(--et-sdk-dark-800);
    color: var(--et-sdk-light-0);
    padding: 12px;
    box-shadow: var(--et-sdk-shadow-normal);
}
</style>
