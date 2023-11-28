export enum EtOverlayEvent {
    onClick,
    onShow,
    onHide
}

export interface IEtOverlayProvide {
    setTransparency: (transparency: boolean) => void;
    setVisibility: (visibility: boolean) => void;
    toggle: () => void;
    addEvent: (event: EtOverlayEvent, callback: () => void) => void;
    removeEvent: (event: EtOverlayEvent, callback: () => void) => void;
}
