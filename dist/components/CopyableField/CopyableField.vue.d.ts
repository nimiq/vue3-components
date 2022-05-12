export declare const COPYABLE_FIELD_DEFAULT_FONT_SIZE = 3;
export declare const COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL = 2.5;
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: () => string | number | {
            [key: string]: any;
        };
        required: true;
        validator: (value: string | object) => boolean;
    };
    label: StringConstructor;
    small: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    value$: import("vue").Ref<HTMLSpanElement | null>;
    valueContainer$: import("vue").Ref<HTMLDivElement | null>;
    currentKey: import("vue").Ref<string>;
    fontSize: import("vue").Ref<number>;
    copied: import("vue").Ref<boolean>;
    isKeyedValue: import("vue").ComputedRef<boolean>;
    hasSingleKey: import("vue").ComputedRef<boolean>;
    copy: () => void;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: () => string | number | {
            [key: string]: any;
        };
        required: true;
        validator: (value: string | object) => boolean;
    };
    label: StringConstructor;
    small: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    small: boolean;
}>;
export default _default;
