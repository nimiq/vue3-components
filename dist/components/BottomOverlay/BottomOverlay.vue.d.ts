export declare enum BottomOverlayEvent {
    CLOSE = "close"
}
export declare enum BottomOverlayTheme {
    DARK = "dark",
    LIGHT = "light",
    GREEN = "green"
}
declare const _default: import("vue").DefineComponent<{
    theme: {
        type: StringConstructor;
        default: BottomOverlayTheme;
        validator: (theme: any) => boolean;
    };
}, {
    hasCloseButton: import("vue").Ref<boolean>;
    onClose: () => void;
    BottomOverlayTheme: typeof BottomOverlayTheme;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, BottomOverlayEvent.CLOSE[], BottomOverlayEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    theme: {
        type: StringConstructor;
        default: BottomOverlayTheme;
        validator: (theme: any) => boolean;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    theme: string;
}>;
export default _default;
