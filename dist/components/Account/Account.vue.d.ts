import { Ref } from 'vue';
export declare enum AccountEvent {
    CHANGED = "changed"
}
export declare enum AccountLayout {
    ROW = "row",
    COLUMN = "column"
}
declare const _default: import("vue").DefineComponent<{
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
        default: AccountLayout;
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
    label$: Ref<import("vue").DefineComponent<{
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
        input$: Ref<HTMLInputElement | null>;
        widthPlaceholder$: Ref<HTMLSpanElement | null>;
        widthValue$: Ref<HTMLSpanElement | null>;
        liveValue: Ref<string>;
        width: Ref<number>;
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
    showImage: Ref<boolean>;
    isNimiqAddress: () => boolean;
    isLabelNimiqAddress: () => boolean;
    onModelValueUpdate: (label: string) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, AccountEvent.CHANGED[], AccountEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
        default: AccountLayout;
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
}>;
export default _default;
