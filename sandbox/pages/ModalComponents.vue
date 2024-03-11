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

            <EtButtonDefault @click="open2AndSure" style="margin-top: 15px; display: block;">
                Open two tests and one "Are you sure" modal
            </EtButtonDefault>

            <EtButtonDefault @click="openWithSavedState" style="margin-top: 15px; display: block;">
                Open one test modal and save state to url
            </EtButtonDefault>

            <EtButtonDefault @click="open5WithSavedState" style="margin-top: 15px; display: block;">
                Open five test modal and save state to url
            </EtButtonDefault>

            <EtButtonDefault  @click="modalProvide?.openModal('SDKDateTimePicker')" style="margin-top: 15px;  display: block;">
                Open datepicker modal
            </EtButtonDefault>

            <EtButtonDefault @click="openPleaseWait(5)" style="margin-top: 15px; display: block;">
                Open please wait modal for 5 seconds
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
import {wait} from "../../src/helpers/async";
import {pleaseWait} from "../../src/helpers/misc";

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
    modalProvide?.openModal("TestModal", {
        testData: "I should be behind the AreYouSure modal, test modal 1"
    });
    modalProvide?.openModal("TestModal", {
        testData: "Test modal 2"
    });
}

function openWithSavedState() {
    modalProvide?.openModal("TestModal", {
        testData: "Some test data! that is saved in url and when you refresh the page, I am still here!"
    }, ['testData']);
}

function open5WithSavedState() {
    modalProvide?.openModal("TestModal", {
        testData: "Some test data! that is saved in url and when you refresh the page, 1"
    }, ['testData']);
    modalProvide?.openModal("TestModal", {
        testData: "Some test data! that is saved in url and when you refresh the page, 2"
    }, ['testData']);
    modalProvide?.openModal("TestModal", {
        testData: "Some test data! that is saved in url and when you refresh the page, 3"
    }, ['testData']);
    modalProvide?.openModal("TestModal", {
        testData: "Some test data! that is saved in url and when you refresh the page, 4"
    }, ['testData']);
    modalProvide?.openModal("TestModal", {
        testData: "Some test data! that is saved in url and when you refresh the page, 5"
    }, ['testData']);
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

function openPleaseWait(seconds: number) {
    pleaseWait(async () => {
        await wait(seconds * 1000);
    });
}

</script>