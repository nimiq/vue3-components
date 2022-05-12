import { FiatApiSupportedFiatCurrency } from '@nimiq/utils';
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: () => ({
            amount: number;
            fee: number;
            isValid: boolean;
        });
        default: () => {
            amount: number;
            fee: number;
            isValid: boolean;
        };
    };
    availableBalance: {
        type: NumberConstructor;
        default: number;
    };
    fiatAmount: NumberConstructor;
    fiatCurrency: () => FiatApiSupportedFiatCurrency;
}, {
    amountInput$: import("vue").Ref<import("vue").DefineComponent<{
        modelValue: NumberConstructor;
        maxFontSize: {
            type: NumberConstructor;
            default: number;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        vanishing: {
            type: BooleanConstructor;
            default: boolean;
        };
        decimals: {
            type: NumberConstructor;
            default: number;
        };
    }, {
        fullWidth$: import("vue").Ref<HTMLDivElement | null>;
        input$: import("vue").Ref<HTMLInputElement | null>;
        widthPlaceholder$: import("vue").Ref<HTMLSpanElement | null>;
        widthValue$: import("vue").Ref<HTMLSpanElement | null>;
        valueInLuna: import("vue").Ref<number>;
        isFocussed: import("vue").Ref<boolean>;
        maxWidth: import("vue").Ref<number>;
        formattedValue: import("vue").WritableComputedRef<string>;
        width: import("vue").Ref<number>;
        fontSize: import("vue").Ref<number>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        modelValue: NumberConstructor;
        maxFontSize: {
            type: NumberConstructor;
            default: number;
        };
        placeholder: {
            type: StringConstructor;
            default: string;
        };
        vanishing: {
            type: BooleanConstructor;
            default: boolean;
        };
        decimals: {
            type: NumberConstructor;
            default: number;
        };
    }>> & {
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }, {
        placeholder: string;
        decimals: number;
        vanishing: boolean;
        maxFontSize: number;
    }> | null>;
    liveAmount: import("vue").Ref<number>;
    isValid: import("vue").ComputedRef<boolean>;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: () => ({
            amount: number;
            fee: number;
            isValid: boolean;
        });
        default: () => {
            amount: number;
            fee: number;
            isValid: boolean;
        };
    };
    availableBalance: {
        type: NumberConstructor;
        default: number;
    };
    fiatAmount: NumberConstructor;
    fiatCurrency: () => FiatApiSupportedFiatCurrency;
}>>, {
    modelValue: {
        amount: number;
        fee: number;
        isValid: boolean;
    };
    availableBalance: number;
}>;
export default _default;
