import { Cookie } from "@nimiq/utils";
import { ref } from "vue";

export type I18n$tVariables = { [key: string]: string | number };

export enum I18N_EVENTS {
    LANGUAGE_READY = 'language-ready',
}

const I18N_DEFAULT_LANGUAGE = 'en';
const I18N_SUPPORTED_LANGUAGES = [
    I18N_DEFAULT_LANGUAGE,
    'de', 'es', 'fr', 'nl', 'pt', 'ru', 'uk', 'zh',
];

/** Current active language */
const i18nLang = ref<string>(detectLanguage());
const loadedMessages: { [lang: string]: { [key: string]: string } } = {};
const registeredComponents: string[] = [];

/**
 * Set the language to use. This will lazy-load the translation files and rerender the ui once ready.
 * @param {string} lang - The language to use.
 */
export function setLanguage(lang: string) {
    // If the language is not supported set it to the default one
    if (!I18N_SUPPORTED_LANGUAGES.includes(lang)) {
        lang = I18N_DEFAULT_LANGUAGE;
    }
    if (lang === i18nLang.value) return;

    i18nLang.value = lang;
    for (const componentName of Object.keys(registeredComponents)) {
        loadComponentLanguageFile(componentName);
    }
}

/**
 * Detect the language to use. If no language is set fallback to the browser language.
 * @returns {string} The language code
 */
export function detectLanguage(): string {
    const langCookie = Cookie.getCookie('lang');
    // const fallbackLang = window.navigator.language.split('-')[0];
    const fallbackLang = 'en'; // TODO just temporarily, until language switching is enabled in wallet

    let lang = langCookie || fallbackLang;
    // If the language is not supported set it to the default one
    if (!I18N_SUPPORTED_LANGUAGES.includes(lang)) {
        lang = I18N_DEFAULT_LANGUAGE;
    }
    return lang;
}

/**
 * Asynchronously load a translation file.
 * @param {string} componentName - Name of the component you want to load a translation for
 */
async function loadComponentLanguageFile(componentName: string) {
    const componentLang = i18nLang.value + '-' + componentName;

    if (!(componentLang in loadedMessages) && i18nLang.value !== 'en') {
        // Lazy-load translations. For English we don't load a language file but use the translation keys directly.
        // Note that the request is cached and not repeated for parallel calls.
        const messages = await import(
            // tslint:disable-next-line: trailing-comma
            /* webpackChunkName: "lang-[request]" */ `./${i18nLang}/${componentName}.json`
        );

        loadedMessages[componentLang] = messages.default || {};
    }
}

/**
 * Get the translation of a given string for a component.
 * @param {string} componentName - Name of the component you want the translation for
 * @param {string} key - The string you want the translation for
 * @param {I18n$tVariables} [variables] - Variables to be replaced in the translated string. Optional.
 * @returns {string} The translated string.
 */
export function $t(componentName: string, key: string, variables?: I18n$tVariables): string;
/**
 * Get the translation of a given string for a component.
 * @param {string} componentName - Name of the component you want the translation for
 * @param {string} key - The string you want the translation for
 * @param {string} lang - Language to use. The language has to be already loaded.
 * @param {I18n$tVariables} [variables] - Variables to be replaced in the translated string. Optional.
 * @returns {string} The translated string.
 */
export function $t(componentName: string, key: string, lang: string, variables?: I18n$tVariables): string;
export function $t(
    componentName: string,
    key: string,
    variablesOrLang?: I18n$tVariables | string,
    variables?: I18n$tVariables,
): string {
    let lang;
    if (typeof variablesOrLang === 'string') {
        lang = variablesOrLang;
    } else {
        lang = i18nLang.value;
        variables = variablesOrLang;
    }
    const componentLang = `${lang}-${componentName}`;

    let message = loadedMessages[componentLang]
        ? loadedMessages[componentLang][key] || key
        : key;

    if (typeof variables === 'object' || Array.isArray(variables)) {
        message = message.replace(/{(\w+?)}/g, (match, variable) => variables![variable].toString() || match);
    }

    return message;
}

export function loadI18n(componentName: string)
    : (key: string, variablesOrLang?: I18n$tVariables | string, variables?: I18n$tVariables) => string {
    loadComponentLanguageFile(componentName);

    // @ts-ignore
    return $t.bind(undefined, componentName);
}

// Update the language in case it was changed via language cookie.
window.addEventListener('focus', () => setLanguage(detectLanguage()));
