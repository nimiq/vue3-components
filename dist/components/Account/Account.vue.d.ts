import { Ref } from 'vue';
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
    }, unknown, {}, {
        $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
    }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "paste" | "changed")[], "input" | "paste" | "changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
        onInput?: ((...args: any[]) => any) | undefined;
        onChanged?: ((...args: any[]) => any) | undefined;
    }, {
        disabled: boolean;
        modelValue: string;
        vanishing: boolean;
    }> | null>;
    showImage: Ref<boolean>;
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
}>;
export default _default;
