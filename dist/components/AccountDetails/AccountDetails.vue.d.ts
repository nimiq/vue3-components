declare const _default: import("vue").DefineComponent<{
    address: {
        type: StringConstructor;
        required: true;
    };
    image: StringConstructor;
    label: StringConstructor;
    walletLabel: StringConstructor;
    balance: NumberConstructor;
    editable: BooleanConstructor;
    placeholder: StringConstructor;
}, {
    account$: import("vue").Ref<import("vue").DefineComponent<{
        label: {
            type: StringConstructor;
            required: true;
        };
        displayAsCashlink: {
            type: BooleanConstructor;
            default: boolean;
        };
        decimals: {
            type: NumberConstructor;
            default: number;
        };
        layout: {
            type: StringConstructor;
            default: string;
            validator: (layout: any) => boolean;
        };
        address: StringConstructor;
        image: StringConstructor;
        placeholder: StringConstructor;
        walletLabel: StringConstructor;
        balance: NumberConstructor;
        editable: BooleanConstructor;
    }, {
        label$: import("vue").Ref<import("vue").DefineComponent<{
            maxBytes: NumberConstructor;
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            placeholder: StringConstructor;
            vanishing: {
                type: BooleanConstructor;
                default: boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
        }, {
            input$: import("vue").Ref<HTMLInputElement | null>;
            widthPlaceholder$: import("vue").Ref<HTMLSpanElement | null>;
            widthValue$: import("vue").Ref<HTMLSpanElement | null>;
            liveValue: import("vue").Ref<string>;
            width: import("vue").Ref<number>;
            onInput: () => void;
            onBlur: () => void;
        }, unknown, {}, {
            $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
        }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("paste" | "update:modelValue" | "changed")[], "paste" | "update:modelValue" | "changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            maxBytes: NumberConstructor;
            modelValue: {
                type: StringConstructor;
                default: string;
            };
            placeholder: StringConstructor;
            vanishing: {
                type: BooleanConstructor;
                default: boolean;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & {
            onPaste?: ((...args: any[]) => any) | undefined;
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChanged?: ((...args: any[]) => any) | undefined;
        }, {
            disabled: boolean;
            modelValue: string;
            vanishing: boolean;
        }> | null>;
        showImage: import("vue").Ref<boolean>;
        isNimiqAddress: () => boolean;
        isLabelNimiqAddress: () => boolean;
        onInput: (label: string) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "changed"[], "changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        label: {
            type: StringConstructor;
            required: true;
        };
        displayAsCashlink: {
            type: BooleanConstructor;
            default: boolean;
        };
        decimals: {
            type: NumberConstructor;
            default: number;
        };
        layout: {
            type: StringConstructor;
            default: string;
            validator: (layout: any) => boolean;
        };
        address: StringConstructor;
        image: StringConstructor;
        placeholder: StringConstructor;
        walletLabel: StringConstructor;
        balance: NumberConstructor;
        editable: BooleanConstructor;
    }>> & {
        onChanged?: ((...args: any[]) => any) | undefined;
    }, {
        layout: string;
        decimals: number;
        displayAsCashlink: boolean;
        editable: boolean;
    }> | null>;
    onInput: (label: string) => void;
    onClose: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "changed")[], "close" | "changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    address: {
        type: StringConstructor;
        required: true;
    };
    image: StringConstructor;
    label: StringConstructor;
    walletLabel: StringConstructor;
    balance: NumberConstructor;
    editable: BooleanConstructor;
    placeholder: StringConstructor;
}>> & {
    onChanged?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    editable: boolean;
}>;
export default _default;
