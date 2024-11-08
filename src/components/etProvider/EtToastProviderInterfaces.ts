import type { Raw } from "@vue/reactivity";
import { markRaw } from "vue";
import EtIconCircleInfoSolid from "../etIcon/EtIconCircleInfo.vue";

export interface IEtToastProvider {
    showToast: <T = any>(options: IEtToastOptions<T>) => IEtActiveToast<T>;
    hideToast: (guid: string) => void;
}

export interface IEtToastContent {
    iconComponent?: Raw<object>;
    text?: string;
    style?: "default" | "success" | "warning" | "error";
    dismissible?: boolean;
}

export interface IEtToastOptions<T = any> {
    content?: IEtToastContent;
    component?: Raw<object>;
    duration?: number;
    position?: {
        vertical?: "top" | "bottom";
        horizontal?: "left" | "center" | "right";
    };
    meta?: T;
}

export interface IEtActiveToast<T = any> {
    guid: string;
    options: IEtToastOptions<T>;
    remove: () => void;
}

export const IEtToastOptionsDefaults: IEtToastOptions = {
    content: {
        iconComponent: markRaw(EtIconCircleInfoSolid),
        text: "",
        style: "default",
        dismissible: true
    },
    duration: 5000,
    position: {
        vertical: "top",
        horizontal: "center"
    }
};
