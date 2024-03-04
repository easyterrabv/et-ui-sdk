<template>
    <slot />
    <div class="et-sdk-modals__container">
        <template
            v-for="(openModal, index) in openModals"
            :key="openModal.guid"
        >
            <div
                v-if="
                    index === openModals.length - 1 &&
                    (openModal.modal.options.backdrop === true ||
                        openModal.modal.options.backdrop === 'static')
                "
                class="et-sdk-modals__backdrop"
                @click="() => onBackDropClick(openModal)"
            />
            <div class="et-sdk-modals__wrapper">
                <component
                    :is="openModal.modal.component"
                    @close="() => closeModal(openModal.guid)"
                    v-bind="{
                        modalOptions: openModal.modal.options
                    }"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref } from "vue";
import type {
    IEtModalProvide,
    IModal,
    IModalOptions,
    IOpenModal
} from "./EtModalProviderInterfaces";
import type { Raw } from "@vue/reactivity";
import { generateId } from "../../helpers/random";
import { modalOptionsDefaults } from "./EtModalProviderInterfaces";

const registeredModals = new Map<string, IModal>();
const openModalsMap = ref<Map<string, IOpenModal>>(new Map());
const openModals = computed(() => Array.from(openModalsMap.value.values()));

function onBackDropClick(openModal: IOpenModal) {
    if (
        openModal.modal.options.backdrop === "static" ||
        openModal.modal.options.backdrop === false
    ) {
        return;
    }

    closeModal(openModal.guid);
}

function registerModal(
    name: string,
    component: Raw<object>,
    options?: IModalOptions
) {
    if (registeredModals.has(name)) {
        return;
    }

    registeredModals.set(name, {
        name,
        component,
        options: {
            ...modalOptionsDefaults,
            ...(options || {})
        }
    });
}

function unregisterModal(name: string) {
    if (!registeredModals.has(name)) {
        return;
    }

    registeredModals.delete(name);
}

function openModal(name: string) {
    if (!registeredModals.has(name)) {
        return null;
    }

    const guid = generateId(25, "SDK_MODAL");

    const modalInfo: IModal | undefined = registeredModals.get(name);

    if (!modalInfo) {
        return null;
    }

    openModalsMap.value.set(guid, {
        guid: guid,
        modal: modalInfo as IModal
    });

    return guid;
}

function closeModalByName(name: string) {
    openModalsMap.value.forEach((openModal, guid) => {
        if (openModal.modal.name === name) {
            closeModal(guid);
        }
    });
}

function closeModal(guid: string) {
    openModalsMap.value.delete(guid);
}

provide<IEtModalProvide>("SDKModalProvide", {
    registerModal,
    unregisterModal,
    openModal,
    closeModalByName,
    closeModal
});
</script>

<style>
.et-sdk-modals__wrapper {
    position: absolute;
    z-index: 1000;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
}

.et-sdk-modals__backdrop {
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--et-sdk-dark-900);
    opacity: 0.2;
}
</style>
