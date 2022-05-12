import { I18n$tVariables } from './I18nComposable';
declare const _default: import("vue").DefineComponent<{
    path: {
        type: StringConstructor;
        required: true;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {}, {
    $t(key: string, variablesOrLang?: string | I18n$tVariables | undefined, variables?: I18n$tVariables | undefined): string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    path: {
        type: StringConstructor;
        required: true;
    };
    tag: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    tag: string;
}>;
/**
 * Component for slot interpolation, similar to vue-i18n's interpolation component,
 * see https://kazupon.github.io/vue-i18n/guide/interpolation.html#slots-syntax-usage
 */
export default _default;
