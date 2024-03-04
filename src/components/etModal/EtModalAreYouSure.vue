<template>
    <EtModal class="sdk-modal-are-you-sure">
        <template #header>
            {{ title }}
        </template>

        {{ content }}

        <template #footer>
            <div class="sdk-modal-are-you-sure__footer-buttons">
                <EtButtonDefault @click="handleNo">No</EtButtonDefault>
                <EtButtonSuccess @click="handleYes">Yes</EtButtonSuccess>
            </div>
        </template>
    </EtModal>
</template>

<script setup lang="ts">
import EtModal from "./EtModal.vue";
import EtButtonDefault from "../etButton/EtButtonDefault.vue";
import EtButtonSuccess from "../etButton/EtButtonSuccess.vue";
import { inject } from "vue";
import type { IEtModalProvide } from "../etProvider/EtModalProviderInterfaces";

const modalProvide = inject<IEtModalProvide>("SDKModalProvide");

const props = defineProps({
    guid: {
        type: String,
        required: true
    },
    onYes: {
        type: Function,
        required: false
    },
    onNo: {
        type: Function,
        required: false
    },
    title: {
        type: String,
        default: "Are you sure?"
    },
    content: {
        type: String,
        default: ""
    }
});

async function handleNo() {
    await props.onNo?.();
    modalProvide?.closeModal(props.guid);
}

async function handleYes() {
    await props.onYes?.();
    modalProvide?.closeModal(props.guid);
}
</script>

<style>
.sdk-modal-are-you-sure {
    min-width: 450px;
}

.sdk-modal-are-you-sure__footer-buttons {
    display: flex;
    gap: 15px;

    flex-grow: 1;

    .et-sdk-button {
        flex-grow: 1;
    }
}
</style>
