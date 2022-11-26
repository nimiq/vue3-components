export declare enum LabelInputEvent {
    MODELVALUE_UPDATE = "update:modelValue",
    CHANGED = "changed",
    PASTE = "paste"
}
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
    LabelInputEvent: typeof LabelInputEvent;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, LabelInputEvent[], LabelInputEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}>;
export default _default;
