import type { Raw } from "@vue/reactivity";

export interface IEtModalProvide {
    registerModal: (
        name: string,
        component: Raw<object>,
        options?: IModalOptions
    ) => void;
    unregisterModal: (name: string) => void;
    openModal(name: string, props?: Record<string, any>): string | null;
    closeModalByName(name: string): void;
    closeModal(guid: string): void;
}

export interface IModalOptions {
    // Same as the bootstrap framework modal options
    backdrop?: boolean | "static";
    focus?: boolean;
    keyboard?: boolean;

    // New options
    showX?: boolean;
    alwaysOnTop?: boolean;
}

export const modalOptionsDefaults: Required<IModalOptions> = {
    backdrop: true,
    focus: true,
    keyboard: true,
    showX: true,
    alwaysOnTop: false
};

export interface IModal {
    name: string;
    component: Raw<object>;
    options: IModalOptions;
}

export interface IOpenModal {
    guid: string;
    modal: IModal;
    props: Record<string, any>;
}