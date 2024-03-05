<template>
    <EtModal>
        <template #header>
            Testing Modal
        </template>

        <strong>
            This is a basic modal
        </strong>

        <p>
            Just a header, some text and two close buttons, one in the footer and one in the top right corner
        </p>

        <p v-if="testData">
            {{testData}}
        </p>

        <template #footer="{close}">
            <EtButtonDefault @click="close">Close</EtButtonDefault>
            <EtButtonDanger @click="handleDelete">Delete</EtButtonDanger>
        </template>
    </EtModal>
</template>

<script setup lang="ts">
import EtButtonDefault from "../../src/components/etButton/EtButtonDefault.vue";
import EtModal from "../../src/components/etModal/EtModal.vue";
import EtButtonDanger from "../../src/components/etButton/EtButtonDanger.vue";
import {inject} from "vue";
import type {IEtModalProvide} from "../../src/components/etProvider/EtModalProviderInterfaces";

const modalProvide = inject<IEtModalProvide>("SDKModalProvide");

const props = defineProps({
    guid: {
        type: String,
        required: true
    },
    testData: {
        type: String,
        default: ''
    }
});

function handleDelete() {
    modalProvide?.openModal("SDKAreYouSure",  {
        onYes: () => {
            modalProvide?.closeModal(props.guid);
        }
    });
}
</script>