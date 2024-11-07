<template>
    <slot />
    <div class="et-sdk-toasts__wrapper">
        <EtToastGroup :toastGroup="topLeft" location="top-left" />
        <EtToastGroup :toastGroup="topCenter" location="top-center" />
        <EtToastGroup :toastGroup="topRight" location="top-right" />
        <EtToastGroup :toastGroup="bottomLeft" location="bottom-left" />
        <EtToastGroup :toastGroup="bottomCenter" location="bottom-center" />
        <EtToastGroup :toastGroup="bottomRight" location="bottom-right" />
    </div>
</template>

<script lang="ts" setup>
import { provide, ref } from "vue";
import {
    type IEtActiveToast,
    type IEtToastOptions,
    IEtToastOptionsDefaults,
    type IEtToastProvider
} from "./EtToastProviderInterfaces";
import { generateId } from "../../helpers/random";
import EtToastGroup from "../etToast/EtToastGroup.vue";

const topLeft = ref<IEtActiveToast[]>([]);
const topCenter = ref<IEtActiveToast[]>([]);
const topRight = ref<IEtActiveToast[]>([]);
const bottomLeft = ref<IEtActiveToast[]>([]);
const bottomCenter = ref<IEtActiveToast[]>([]);
const bottomRight = ref<IEtActiveToast[]>([]);

const toasts = ref<IEtActiveToast[]>([]);

const showToast = (options: IEtToastOptions) => {
    const generatedGuid = generateId();

    const toast: IEtActiveToast = {
        guid: generatedGuid,
        options: {
            content: {
                ...IEtToastOptionsDefaults.content,
                ...options.content
            },
            component: options.component || undefined,
            duration: options.duration || IEtToastOptionsDefaults.duration,
            position: {
                vertical:
                    options.position?.vertical ||
                    IEtToastOptionsDefaults.position!.vertical ||
                    "top",
                horizontal:
                    options.position?.horizontal ||
                    IEtToastOptionsDefaults.position!.horizontal ||
                    "center"
            },
            meta: options.meta
        },
        remove: () => hideToast(generatedGuid)
    };

    if (toast.options.position!.vertical === "top") {
        if (toast.options.position!.horizontal === "left") {
            topLeft.value.push(toast);
        } else if (toast.options.position!.horizontal === "center") {
            topCenter.value.push(toast);
        } else if (toast.options.position!.horizontal === "right") {
            topRight.value.push(toast);
        }
    } else if (toast.options.position!.vertical === "bottom") {
        if (toast.options.position!.horizontal === "left") {
            bottomLeft.value.push(toast);
        } else if (toast.options.position!.horizontal === "center") {
            bottomCenter.value.push(toast);
        } else if (toast.options.position!.horizontal === "right") {
            bottomRight.value.push(toast);
        }
    }

    if (toast.options.duration! > 0) {
        setTimeout(() => {
            hideToast(generatedGuid);
        }, toast.options.duration);
    }

    toasts.value.push(toast);

    return toast;
};

const hideToast = (guid: string) => {
    // get toast
    const toast = toasts.value.find((toast) => toast.guid === guid);

    if (!toast) {
        return;
    }

    if (toast.options.position!.vertical === "top") {
        if (toast.options.position!.horizontal === "left") {
            topLeft.value = topLeft.value.filter(
                (toast) => toast.guid !== guid
            );
        } else if (toast.options.position!.horizontal === "center") {
            topCenter.value = topCenter.value.filter(
                (toast) => toast.guid !== guid
            );
        } else if (toast.options.position!.horizontal === "right") {
            topRight.value = topRight.value.filter(
                (toast) => toast.guid !== guid
            );
        }
    } else if (toast.options.position!.vertical === "bottom") {
        if (toast.options.position!.horizontal === "left") {
            bottomLeft.value = bottomLeft.value.filter(
                (toast) => toast.guid !== guid
            );
        } else if (toast.options.position!.horizontal === "center") {
            bottomCenter.value = bottomCenter.value.filter(
                (toast) => toast.guid !== guid
            );
        } else if (toast.options.position!.horizontal === "right") {
            bottomRight.value = bottomRight.value.filter(
                (toast) => toast.guid !== guid
            );
        }
    }

    toasts.value = toasts.value.filter((toast) => toast.guid !== guid);
};

provide<IEtToastProvider>("SDKToastProvide", {
    showToast,
    hideToast
});
</script>

<style>
.et-sdk-toasts__wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99999;
}
</style>
