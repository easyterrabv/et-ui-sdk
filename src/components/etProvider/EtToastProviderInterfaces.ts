import type { Raw } from "@vue/reactivity";
import { markRaw } from "vue";
import EtIconCheckSolid from "../etIcon/EtIconCheckSolid.vue";

export interface IEtToastProvider {
    showToast: (options: IEtToastOptions) => IEtActiveToast;
    hideToast: (guid: string) => void;
}

export interface IEtToastContent {
    iconComponent?: Raw<object>;
    text?: string;
    dismissible?: boolean;
}

export interface IEtToastOptions {
    content?: IEtToastContent;
    component?: Raw<object>;
    duration?: number;
    position?: {
        vertical?: "top" | "bottom";
        horizontal?: "left" | "center" | "right";
    };
}

export interface IEtActiveToast {
    guid: string;
    options: IEtToastOptions;
    remove: () => void;
}

export const IEtToastOptionsDefaults: IEtToastOptions = {
    content: {
        iconComponent: markRaw(EtIconCheckSolid),
        text: "",
        dismissible: true
    },
    duration: 5000,
    position: {
        vertical: "top",
        horizontal: "center"
    }
};
