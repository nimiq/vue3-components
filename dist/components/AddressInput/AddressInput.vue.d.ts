export declare const ADDRESS_MAX_LENGTH_WITHOUT_SPACES: number;
export declare const ADDRESS_MAX_LENGTH: number;
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
    willBeAddress: import("vue").ComputedRef<boolean>;
    isDomain: import("vue").ComputedRef<boolean>;
    _onKeyDown: (e: KeyboardEvent) => void;
    _onInput: (e: Event & {
        inputType?: string;
    }) => void;
    _onPaste: (e: ClipboardEvent) => void;
    _onCut: (e: ClipboardEvent) => void;
    _onFocus: () => void;
    _formatClipboard: () => void;
    _updateSelection: () => void;
    _isBlockFocused: (blockIndex: number) => boolean;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("address" | "paste" | "update:modelValue")[], "address" | "paste" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    autofocus: BooleanConstructor;
    allowDomains: BooleanConstructor;
}>> & {
    onPaste?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onAddress?: ((...args: any[]) => any) | undefined;
}, {
    autofocus: boolean;
    modelValue: string;
    allowDomains: boolean;
}>;
export default _default;
