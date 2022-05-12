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
    textarea$: import("vue").Ref<HTMLTextAreaElement | null>;
    root$: import("vue").Ref<HTMLDivElement | null>;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    autofocus: BooleanConstructor;
    allowDomains: BooleanConstructor;
}>>, {
    autofocus: boolean;
    modelValue: string;
    allowDomains: boolean;
}>;
export default _default;
