export declare enum LongPressButtonEvent {
    LONG_PRESS = "long-press"
}
declare const _default: import("vue").DefineComponent<{
    duration: {
        type: NumberConstructor;
        default: number;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}, {
    isPressed: import("vue").Ref<boolean>;
    showKeepPressingPrompt: import("vue").Ref<boolean>;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, LongPressButtonEvent.LONG_PRESS[], LongPressButtonEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    duration: {
        type: NumberConstructor;
        default: number;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onLong-press"?: ((...args: any[]) => any) | undefined;
}, {
    color: string;
    duration: number;
}>;
export default _default;
