export declare enum AccountDetailsEvent {
    CLOSE = "close",
    CHANGED = "changed"
}
declare const _default: import("vue").DefineComponent<{
    address: {
        type: StringConstructor;
        required: true;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    image: StringConstructor;
    label: StringConstructor;
    walletLabel: StringConstructor;
    balance: NumberConstructor;
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
            default: import("../Account/Account.vue").AccountLayout;
            validator: (layout: any) => boolean;
        };
        editable: {
            type: BooleanConstructor;
            default: boolean;
        };
        address: StringConstructor;
        image: StringConstructor;
        placeholder: StringConstructor;
        walletLabel: StringConstructor;
        balance: NumberConstructor;
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
            LabelInputEvent: typeof import("../LabelInput/LabelInput.vue").LabelInputEvent;
        }, unknown, {}, {
            $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
        }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("../LabelInput/LabelInput.vue").LabelInputEvent[], import("../LabelInput/LabelInput.vue").LabelInputEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChanged?: ((...args: any[]) => any) | undefined;
            onPaste?: ((...args: any[]) => any) | undefined;
        }, {
            modelValue: string;
            vanishing: boolean;
            disabled: boolean;
        }> | null>;
        showImage: import("vue").Ref<boolean>;
        isNimiqAddress: () => boolean;
        isLabelNimiqAddress: () => boolean;
        onModelValueUpdate: (label: string) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("../Account/Account.vue").AccountEvent.CHANGED[], import("../Account/Account.vue").AccountEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
            default: import("../Account/Account.vue").AccountLayout;
            validator: (layout: any) => boolean;
        };
        editable: {
            type: BooleanConstructor;
            default: boolean;
        };
        address: StringConstructor;
        image: StringConstructor;
        placeholder: StringConstructor;
        walletLabel: StringConstructor;
        balance: NumberConstructor;
    }>> & {
        onChanged?: ((...args: any[]) => any) | undefined;
    }, {
        decimals: number;
        displayAsCashlink: boolean;
        layout: string;
        editable: boolean;
    }> | null>;
    onChanged: (label: string) => void;
    onClose: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, AccountDetailsEvent[], AccountDetailsEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    address: {
        type: StringConstructor;
        required: true;
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    image: StringConstructor;
    label: StringConstructor;
    walletLabel: StringConstructor;
    balance: NumberConstructor;
    placeholder: StringConstructor;
}>> & {
    onChanged?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
}, {
    editable: boolean;
}>;
export default _default;
