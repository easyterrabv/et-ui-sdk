<template>
    <EtModal class="et-sdk-data-grid-filter-save-modal">
        <template #header> Filter Set name </template>

        <EtForm @submit="handleSaveFilters">
            <EtFormGroup>
                <EtInput ref="labelInput" v-model="label" />
            </EtFormGroup>
        </EtForm>

        <template #footer="{ close }">
            <EtButtonSuccess @click="handleSaveFilters">Save</EtButtonSuccess>
            <EtButtonDefault @click="close">Close</EtButtonDefault>
        </template>
    </EtModal>
</template>

<script setup lang="ts">
import EtButtonDefault from "../../../etButton/EtButtonDefault.vue";
import EtModal from "../../../etModal/EtModal.vue";
import EtButtonSuccess from "../../../etButton/EtButtonSuccess.vue";
import EtForm from "../../../etForm/EtForm.vue";
import EtFormGroup from "../../../etForm/EtFormGroup.vue";
import { inject, onMounted, ref } from "vue";
import { type IEtModalProvide } from "../../../etProvider/EtModalProviderInterfaces";
import EtInput from "../../../etForm/EtInput.vue";

const modalProvide = inject<IEtModalProvide>("SDKModalProvide");

const props = defineProps({
    guid: {
        type: String,
        required: true
    },
    callback: {
        type: Function,
        default() {
            return () => {};
        }
    }
});

const label = ref("");
const labelInput = ref<HTMLElement | null>(null);

function handleSaveFilters() {
    props.callback?.(label.value);
    modalProvide?.closeModal(props.guid);
}

onMounted(() => {
    labelInput.value?.focus?.();
});
</script>

<style>
.et-sdk-data-grid-filter-save-modal {
    width: 450px;
}
</style>
