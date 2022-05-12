import { BrowserDetection } from '@nimiq/utils';
export declare const enum QrScannerEvents {
    RESULT = "result",
    CANCEL = "cancel",
    ERROR = "error"
}
declare const _default: import("vue").DefineComponent<{
    reportFrequency: {
        type: NumberConstructor;
        default: number;
    };
    validate: FunctionConstructor;
}, {
    video$: import("vue").Ref<HTMLVideoElement | null>;
    cameraAccessFailed: import("vue").Ref<boolean>;
    hasCamera: import("vue").Ref<boolean>;
    isMobileOrTablet: boolean;
    browser: BrowserDetection.Browser;
    _cancel: () => void;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    reportFrequency: {
        type: NumberConstructor;
        default: number;
    };
    validate: FunctionConstructor;
}>>, {
    reportFrequency: number;
}>;
export default _default;
