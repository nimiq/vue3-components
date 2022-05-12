declare const _default: import("vue").DefineComponent<{
    wallet: {
        type: () => ({
            id: string;
            label: string;
            accounts: any[];
            type: number;
            fileExported: boolean;
            wordsExported: boolean;
            balance?: number;
        });
        required: true;
    };
}, {
    addresses: import("vue").ComputedRef<string[]>;
    isBip39: import("vue").ComputedRef<boolean>;
    isKeyguard: import("vue").ComputedRef<boolean>;
    isMultiAddress: import("vue").ComputedRef<boolean>;
    fileMissing: import("vue").ComputedRef<boolean>;
    wordsMissing: import("vue").ComputedRef<boolean>;
    exportMissing: import("vue").ComputedRef<boolean>;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    wallet: {
        type: () => ({
            id: string;
            label: string;
            accounts: any[];
            type: number;
            fileExported: boolean;
            wordsExported: boolean;
            balance?: number;
        });
        required: true;
    };
}>>, {}>;
/** @deprecated */
export default _default;
