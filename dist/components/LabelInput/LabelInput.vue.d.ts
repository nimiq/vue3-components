declare const _default: import("vue").DefineComponent<{
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
}>;
export default _default;
