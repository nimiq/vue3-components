export declare enum AmountInputEvent {
    MODELVALUE_UPDATE = "update:modelValue",
    PASTE = "paste",
    SUBMIT = "submit"
}
declare const _default: import("vue").DefineComponent<{
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
    AmountInputEvent: typeof AmountInputEvent;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, AmountInputEvent[], AmountInputEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    onPaste?: ((...args: any[]) => any) | undefined;
    onSubmit?: ((...args: any[]) => any) | undefined;
}, {
    decimals: number;
    placeholder: string;
    vanishing: boolean;
    maxFontSize: number;
}>;
export default _default;
