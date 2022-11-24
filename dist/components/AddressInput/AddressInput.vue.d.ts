export declare const ADDRESS_MAX_LENGTH_WITHOUT_SPACES: number;
export declare const ADDRESS_MAX_LENGTH: number;
export declare enum AddressInputEvent {
    PASTE = "paste",
    MODELVALUE_UPDATE = "update:modelValue",
    ADDRESS = "address"
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    autofocus: BooleanConstructor;
    allowDomains: BooleanConstructor;
}, {
    root$: import("vue").Ref<HTMLDivElement | null>;
    textarea$: import("vue").Ref<HTMLTextAreaElement | null>;
    currentValue: import("vue").Ref<string>;
    supportsMixBlendMode: boolean;
    willBeAddressBool: import("vue").ComputedRef<boolean>;
    isDomain: import("vue").ComputedRef<boolean>;
    onKeyDown: (e: KeyboardEvent) => void;
    onInput: (e: Event & {
        inputType?: string;
    }) => void;
    onPaste: (e: ClipboardEvent) => void;
    onCut: (e: ClipboardEvent) => void;
    onFocus: () => void;
    formatClipboard: () => void;
    updateSelection: () => void;
    isBlockFocused: (blockIndex: number) => boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, AddressInputEvent[], AddressInputEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    autofocus: BooleanConstructor;
    allowDomains: BooleanConstructor;
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onPaste?: ((...args: any[]) => any) | undefined;
    onAddress?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: string;
    autofocus: boolean;
    allowDomains: boolean;
}>;
export default _default;