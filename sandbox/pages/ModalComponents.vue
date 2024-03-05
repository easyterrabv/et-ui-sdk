<template>
    <EtContent style="background-color: var(--et-sdk-dark-500);">
        <EtModal>
            <template #header>
                Modals
            </template>

            <p>
                This is what a modal would look like if would be opened the normal way.
            </p>

            <p>
                This modal is obviously not a regular modal, because it's rendered into the page itself. Normal modals are opened and hover on top of everything
            </p>

            <EtButtonDefault @click="open2AndSure">
                Open two tests and one "Are you sure" modal
            </EtButtonDefault>

            <template #footer>
                <EtButtonPrimary @click="modalProvide?.openModal('TestModal')">Show me more!</EtButtonPrimary>
                <EtButtonDefault @click="areYouSure">Close</EtButtonDefault>
            </template>
        </EtModal>
    </EtContent>
</template>

<script setup lang="ts">
import EtContent from "src/layouts/Content.vue";
import EtModal from "../../src/components/etModal/EtModal.vue";
import EtButtonPrimary from "../../src/components/etButton/EtButtonPrimary.vue";
import EtButtonDefault from "../../src/components/etButton/EtButtonDefault.vue";
import {inject, markRaw} from "vue";
import type {IEtModalProvide} from "../../src/components/etProvider/EtModalProviderInterfaces";
import EtBasicTestModal from "../modals/EtBasicTestModal.vue";

const modalProvide = inject<IEtModalProvide>("SDKModalProvide");

modalProvide?.registerModal(
    "TestModal",
    markRaw(EtBasicTestModal),
    {
        keyboard: true,
        backdrop: true,
        focus: true
    }
);

function open2AndSure() {
    modalProvide?.openModal("SDKAreYouSure",  {
        content: "I should be on top! Even though I am opened as first modal",
    });
    modalProvide?.openModal("TestModal");
    modalProvide?.openModal("TestModal");
}

function areYouSure() {
    modalProvide?.openModal("SDKAreYouSure",  {
        onYes: () => {
            modalProvide?.openModal("SDKAreYouSure",  {
                content: "Are you really really sure!?",
                onYes: () => {
                    console.log("Yes");
                },
                onNo: () => {
                    console.log("No");
                }
            });
        },
        onNo: () => {
            console.log("No");
        }
    });
}

</script>