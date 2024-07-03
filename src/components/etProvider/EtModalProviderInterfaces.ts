import type { Raw } from "@vue/reactivity";

export interface IEtModalProvide {
    registerModal: (
        name: string,
        component: Raw<object>,
        options?: IModalOptions
    ) => void;
    unregisterModal: (name: string) => void;
    openModal(
        name: string,
        props?: Record<string, any>,
        savedProps?: string[],
        withGuid?: string,
        zAdjustment?: number
    ): string | null;
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
    onlyOpenOne?: boolean;
}

export const modalOptionsDefaults: Required<IModalOptions> = {
    backdrop: true,
    focus: true,
    keyboard: true,
    showX: true,
    alwaysOnTop: false,
    onlyOpenOne: false
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
    savedProps: string[] | boolean;
    zAdjustment: number;
}

export interface SavedUrlModalProps {
    __guid: string;
    __name: string;
    [key: string]: string | number | boolean;
}
export interface SavedUrlModals {
    data: SavedUrlModalProps[];
}
