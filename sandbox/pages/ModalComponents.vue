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

        <EtModal style="margin-top: 50px;">
            <template #header>
                Toasts
            </template>

            <EtButtonDefault @click="openBasicToasts" style="margin-top: 15px; display: block;">
                Show one basic toast
            </EtButtonDefault>

            <EtButtonDefault @click="openRandomToast(1)" style="margin-top: 15px; display: block;">
                Show one random toast
            </EtButtonDefault>

            <EtButtonDefault @click="openRandomToast(10)" style="margin-top: 15px; display: block;">
                Show 10 random toast
            </EtButtonDefault>
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
import type { IEtToastProvider } from "../../src/components/etProvider/EtToastProviderInterfaces";

const modalProvide = inject<IEtModalProvide>("SDKModalProvide");
const toastProvide = inject<IEtToastProvider>("SDKToastProvide");

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
                    openToast('Alright then!');
                },
                onNo: () => {
                    openToast('Okay, then not...');
                }
            });
        },
        onNo: () => {
            openToast('Okay, then not...');
        }
    });
}

function openPleaseWait(seconds: number) {
    pleaseWait(async () => {
        await wait(seconds * 1000);
    });
}

type toastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
const positions: toastPosition[] = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];
type toastStyles = "default" | "success" | "warning" | "error";
const styles: toastStyles[] = ["default", "success", "warning", "error"];

async function openToast(textComp: string, position: toastPosition = "top-center", toastStyles: toastStyles = "default") {
    const [vertical, horizontal] = position.split("-");

    toastProvide.showToast({
        content: {
            text: textComp,
            style: toastStyles
        },
        position: {
            // @ts-ignore
            vertical,
            // @ts-ignore
            horizontal
        }
    });

    await wait(250);
}

function openBasicToasts() {
    openToast("This is a basic toast");
}

async function openRandomToast(count=1) {
    for (let i = 0; i < count; i++) {
        await openToast(
            `This is toast number ${i + 1}`,
            positions[Math.floor(Math.random() * positions.length)],
            styles[Math.floor(Math.random() * styles.length)]
        );
    }
}

</script>