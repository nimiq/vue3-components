declare enum BottomOverlayEvents {
    CLOSE = "close"
}
declare const _default: import("vue").DefineComponent<{
    theme: {
        type: StringConstructor;
        default: string;
        validator: (theme: any) => boolean;
    };
}, {
    BottomOverlayEvents: typeof BottomOverlayEvents;
    hasCloseButton: import("vue").Ref<boolean>;
    onClose: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    theme: {
        type: StringConstructor;
        default: string;
        validator: (theme: any) => boolean;
    };
}>>, {
    theme: string;
}>;
export default _default;
