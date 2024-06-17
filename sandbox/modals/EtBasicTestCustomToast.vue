<template>
    <div>
        Hi, this is a custom toast! <br />
        <EtButtonDefault :size="UI_SIZING.XS" @click="toast">Give me a toast</EtButtonDefault>
    </div>
</template>

<script lang="ts" setup>
import { inject, type PropType } from "vue";
import type { IEtActiveToast } from "../../src/components/etProvider/EtToastProviderInterfaces";
import type { IEtToastProvider } from "../../src/components/etProvider/EtToastProviderInterfaces";
import EtButtonDefault from "../../src/components/etButton/EtButtonDefault.vue";
import { UI_SIZING } from "../../src/helpers/enums";
const toastProvide = inject<IEtToastProvider>("SDKToastProvide");

defineProps({
    toast: {
        type: Object as PropType<IEtActiveToast>,
        required: true
    }
});

function toast() {
    toastProvide.showToast({
        content: {
            text: "Another basic toast!",
            dismissible: false
        }
    });
}
</script>