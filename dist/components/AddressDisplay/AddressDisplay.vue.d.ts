declare const _default: import("vue").DefineComponent<{
    address: {
        type: StringConstructor;
        required: true;
    };
    format: {
        type: () => 'nimiq' | 'ethereum';
        default: string;
    };
    copyable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    chunks: import("vue").ComputedRef<any[]>;
    text: import("vue").ComputedRef<string>;
    chunkTrailingSpaces: import("vue").ComputedRef<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    address: {
        type: StringConstructor;
        required: true;
    };
    format: {
        type: () => 'nimiq' | 'ethereum';
        default: string;
    };
    copyable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    format: "nimiq" | "ethereum";
    copyable: boolean;
}>;
export default _default;
