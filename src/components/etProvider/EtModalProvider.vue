<template>
    <slot />
    <div class="et-sdk-modals__container">
        <template
            v-for="(openModal, index) in sortedModals"
            :key="openModal.guid"
        >
            <div
                v-if="
                    index === sortedModals.length - 1 &&
                    (openModal.modal.options.backdrop === true ||
                        openModal.modal.options.backdrop === 'static')
                "
                class="et-sdk-modals__backdrop"
                :style="{
                    'z-index':
                        10000 +
                        index +
                        (openModal.modal.options.alwaysOnTop ? 1000 : 0) -
                        1
                }"
                @click="() => onBackDropClick(openModal)"
            />
            <div
                class="et-sdk-modals__wrapper"
                :style="{
                    'z-index':
                        10000 +
                        index +
                        (openModal.modal.options.alwaysOnTop ? 1000 : 0)
                }"
            >
                <component
                    :is="openModal.modal.component"
                    @close="() => closeModal(openModal.guid)"
                    :guid="openModal.guid"
                    v-bind="{
                        modalOptions: openModal.modal.options,
                        ...(openModal.props || {})
                    }"
                />
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import {
    computed,
    markRaw,
    nextTick,
    onMounted,
    provide,
    ref,
    watch
} from "vue";
import type {
    IEtModalProvide,
    IModal,
    IModalOptions,
    IOpenModal,
    SavedUrlModalProps,
    SavedUrlModals
} from "./EtModalProviderInterfaces";
import type { Raw } from "@vue/reactivity";
import { generateId } from "../../helpers/random";
import { modalOptionsDefaults } from "./EtModalProviderInterfaces";
import EtModalAreYouSure from "../etModal/EtModalAreYouSure.vue";
import EtModalDateTimePicker from "../etModal/EtModalDateTimePicker.vue";
import EtModalPleaseWait from "../etModal/EtModalPleaseWait.vue";
import { useRoute, useRouter } from "vue-router";
import { useUrlData } from "../etDataGrid/composables/useUrlData";
import { wait } from "../../helpers/async";

const route = useRoute();
const router = useRouter();
const urlData = useUrlData<SavedUrlModals>("__modals", route, router);

const registeredModals = new Map<string, IModal>();
const openModalsMap = ref<Map<string, IOpenModal>>(new Map());
const openModals = computed(() => Array.from(openModalsMap.value.values()));
const sortedModals = computed(() => {
    return openModals.value.sort((a, b) => {
        if (a.modal.options.alwaysOnTop && !b.modal.options.alwaysOnTop) {
            return 1;
        }

        if (!a.modal.options.alwaysOnTop && b.modal.options.alwaysOnTop) {
            return -1;
        }

        return 0;
    });
});

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

// Default modals
registerModal("SDKAreYouSure", markRaw(EtModalAreYouSure), {
    keyboard: false,
    backdrop: "static",
    showX: false,
    alwaysOnTop: true
});

registerModal("SDKPleaseWait", markRaw(EtModalPleaseWait), {
    keyboard: false,
    backdrop: "static",
    showX: false,
    alwaysOnTop: true
});

registerModal("SDKDateTimePicker", markRaw(EtModalDateTimePicker));

function unregisterModal(name: string) {
    if (!registeredModals.has(name)) {
        return;
    }

    registeredModals.delete(name);
}

function openModal(
    name: string,
    props?: Record<string, any>,
    savedProps?: string[] | boolean,
    withGuid?: string
) {
    if (!registeredModals.has(name)) {
        console.warn(
            `'${name}' modal is not available, did you forget to register it?`
        );
        return null;
    }

    const guid = withGuid || generateId(5, "SDK_MODAL");

    const modalInfo: IModal | undefined = registeredModals.get(name);

    if (!modalInfo) {
        return null;
    }

    const modalOptions = modalInfo.options;
    const onlyOpenOne = modalOptions.onlyOpenOne;

    if (onlyOpenOne) {
        const isAlreadyOpen = openModals.value.find(
            (openModal) => openModal.modal.name === name
        );

        if (isAlreadyOpen) {
            return null;
        }
    }

    const openModal: IOpenModal = {
        guid: guid,
        modal: modalInfo as IModal,
        props: props || {},
        savedProps: savedProps || false
    };

    openModalsMap.value.set(guid, openModal);

    saveModalsToUrl();

    return guid;
}

function saveModalsToUrl() {
    if (!route && router) {
        return;
    }

    const urlData = useUrlData<SavedUrlModals>("__modals", route, router);
    const saveDate: SavedUrlModalProps[] = [];

    sortedModals.value.forEach((openModal) => {
        if (
            (typeof openModal.savedProps === "boolean" &&
                !openModal.savedProps) ||
            (Array.isArray(openModal.savedProps) &&
                openModal.savedProps.length === 0)
        ) {
            return;
        }

        let state: SavedUrlModalProps = {
            __guid: openModal.guid,
            __name: openModal.modal.name
        };

        if (Array.isArray(openModal.savedProps)) {
            state = Object.entries(openModal.props || {}).reduce(
                (acc, [key, value]) => {
                    if ((openModal.savedProps as String[]).includes(key)) {
                        if (
                            !["string", "number", "boolean"].includes(
                                typeof value
                            )
                        ) {
                            return acc;
                        }

                        acc[key] = value;
                    }

                    return acc;
                },
                state
            );
        }

        saveDate.push(state);
    });

    if (!saveDate.length) {
        urlData.setDataToUrl({});
        return;
    }

    urlData.setDataToUrl({ data: saveDate });
}

function closeModalByName(name: string) {
    openModalsMap.value.forEach((openModal, guid) => {
        if (openModal.modal.name === name) {
            closeModal(guid);
        }
    });
}

function closeModal(guid: string | null) {
    if (guid) {
        openModalsMap.value.delete(guid);
    }

    saveModalsToUrl();
}

function openModalsFromUrl() {
    const savedModalData = urlData.getDataFromUrl();

    if (!savedModalData) {
        return;
    }

    savedModalData.data.forEach((data) => {
        const props = Object.keys(data).reduce(
            (acc, key) => {
                if (key === "__guid" || key === "__name") {
                    return acc;
                }

                acc[key] = data[key];
                return acc;
            },
            {} as Record<string, any>
        );

        const name = data.__name;
        const guid = data.__guid;

        openModal(name, props, Object.keys(props), guid);
    });
}

onMounted(async () => {
    await nextTick();
    await wait(150);

    if (route.query && Object.keys(route.query).length > 0) {
        openModalsFromUrl();
    } else {
        // In some cases, the route.query is not available yet
        // immediate:true doesn't work, because that conflicts with the once:true
        // So only adding a watcher if it isn't available yet.
        watch(
            () => route.query,
            () => {
                openModalsFromUrl();
            },
            {
                deep: true,
                once: true
            }
        );
    }
});

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
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
}

.et-sdk-modals__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--et-sdk-dark-900);
    opacity: 0.2;
}
</style>
