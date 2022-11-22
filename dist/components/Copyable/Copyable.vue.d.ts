/**
 * **Copyable**
 *
 * Copyable can be used to make a click on one or more elements copy content to the Clipboard with visual feedback.
 * By default the children's contents are copied to the Clipboard. Alternatively, a specific text to be copied can be
 * provided.
 *
 * Props:
 *
 * **text** {string} [optional] - A specific text to be copied to the clipboard on click
 */
export declare const COPYABLE_DISPLAY_TIME = 800;
declare const _default: import("vue").DefineComponent<{
    text: StringConstructor;
}, {
    root$: import("vue").Ref<HTMLDivElement | null>;
    tooltip$: import("vue").Ref<HTMLDivElement | null>;
    copied: import("vue").Ref<boolean>;
    copy: () => void;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    text: StringConstructor;
}>>, {}>;
export default _default;
