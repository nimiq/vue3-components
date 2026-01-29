export declare type I18n$tVariables = {
    [key: string]: string | number;
};
export declare enum I18N_EVENTS {
    LANGUAGE_READY = "language-ready"
}
/**
 * Set the language to use. This will lazy-load the translation files and rerender the ui once ready.
 * @param {string} lang - The language to use.
 */
export declare function setLanguage(lang: string): void;
/**
 * Detect the language to use. If no language is set fallback to the browser language.
 * @returns {string} The language code
 */
export declare function detectLanguage(): string;
/**
 * Get the translation of a given string for a component.
 * @param {string} componentName - Name of the component you want the translation for
 * @param {string} key - The string you want the translation for
 * @param {I18n$tVariables} [variables] - Variables to be replaced in the translated string. Optional.
 * @returns {string} The translated string.
 */
export declare function $t(componentName: string, key: string, variables?: I18n$tVariables): string;
/**
 * Get the translation of a given string for a component.
 * @param {string} componentName - Name of the component you want the translation for
 * @param {string} key - The string you want the translation for
 * @param {string} lang - Language to use. The language has to be already loaded.
 * @param {I18n$tVariables} [variables] - Variables to be replaced in the translated string. Optional.
 * @returns {string} The translated string.
 */
export declare function $t(componentName: string, key: string, lang: string, variables?: I18n$tVariables): string;
export declare function loadI18n(componentName: string): (key: string, variablesOrLang?: I18n$tVariables | string, variables?: I18n$tVariables) => string;
