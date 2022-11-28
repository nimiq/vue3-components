import { PropType } from 'vue';
import { BrowserDetection } from '@nimiq/utils';
export declare enum QrScannerEvents {
    RESULT = "result",
    CANCEL = "cancel",
    ERROR = "error"
}
declare const _default: import("vue").DefineComponent<{
    reportFrequency: {
        type: NumberConstructor;
        default: number;
    };
    validate: PropType<(scanResult: string) => boolean>;
}, {
    root$: import("vue").Ref<HTMLDivElement | null>;
    video$: import("vue").Ref<HTMLVideoElement | null>;
    overlay$: import("vue").Ref<HTMLDivElement | null>;
    cameraAccessFailed: import("vue").Ref<boolean>;
    hasCamera: import("vue").Ref<boolean>;
    isMobileOrTablet: boolean;
    browser: BrowserDetection.Browser;
    cancel: () => void;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, QrScannerEvents[], QrScannerEvents, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    reportFrequency: {
        type: NumberConstructor;
        default: number;
    };
    validate: PropType<(scanResult: string) => boolean>;
}>> & {
    onError?: ((...args: any[]) => any) | undefined;
    onResult?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
}, {
    reportFrequency: number;
}>;
export default _default;
