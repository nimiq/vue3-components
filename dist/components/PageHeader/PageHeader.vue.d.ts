export declare enum PageHeaderEvent {
    BACK = "back"
}
declare const _default: import("vue").DefineComponent<{
    backArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    progressIndicator: {
        type: BooleanConstructor;
        default: boolean;
    };
    numberSteps: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
}, {
    progressSteps: import("vue").ComputedRef<number[]>;
    PageHeaderEvent: typeof PageHeaderEvent;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    backArrow: {
        type: BooleanConstructor;
        default: boolean;
    };
    progressIndicator: {
        type: BooleanConstructor;
        default: boolean;
    };
    numberSteps: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    backArrow: boolean;
    progressIndicator: boolean;
    numberSteps: number;
    step: number;
}>;
export default _default;
