<template>
    <span class="fiat-amount">
        {{ _currencyString }}
    </span>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';
import { FormattableNumber, CurrencyInfo } from '@nimiq/utils';

const FIAT_AMOUNT_NUMBER_REGEX = /(-)?\D*(\d+)(\.(\d+))?/;
const FIAT_AMOUNT_DECIMAL_SEPARATOR_REGEX = /(\d)\D(\d)/;
const FIAT_AMOUNT_CURRENCY_CODE_REGEX = /[A-Z]{3}\s?/i;
const FIAT_AMOUNT_SYMBOL_TRAILING_ALPHA_REGEX = /[A-Z.]$/i;

export default defineComponent({
    name: 'FiatAmount',
    props: {
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        maxRelativeDeviation: {
            type: Number,
            default: .1,
        },
        hideDecimals: {// If set takes precedence over maxRelativeDeviation.
            type: Boolean,
            default: false,
        },
        locale: String,
    },
    setup(props) {
        const _currencyString = computed(() => {
            const positioningLocale = _getPositioningLocale(props.currency);
            // Only create CurrencyInfo for a specific locale if a locale was requested, otherwise use default behavior.
            // Don't use positioningLocale as it's just a rough guess for a language typical for a country where the
            // currency is used and might result in using a language that the user does not understand.
            const currencyInfo = props.locale
                ? new CurrencyInfo(props.currency, props.locale)
                : new CurrencyInfo(props.currency);
            const formattingOptions = {
                style: 'currency',
                currency: props.currency,
                currencyDisplay: 'code', // will later be replaced by the optimized currency symbol provided by CurrencyInfo
                useGrouping: false,
                numberingSystem: 'latn',
                // start with decimal count typical for this.currency, e.g. 2 for eur, unless hideDecimals was requested
                minimumFractionDigits: props.hideDecimals ? 0 : currencyInfo.decimals,
                maximumFractionDigits: props.hideDecimals ? 0 : currencyInfo.decimals,
            };
            let formatted: string;
            let integers: string;
            let relativeDeviation: number;

            do {
                formatted = props.amount.toLocaleString([
                    props.locale || positioningLocale,
                    positioningLocale,
                    `${navigator.language.substring(0, 2)}-${positioningLocale}`,
                    navigator.language,
                    `en-${positioningLocale}`,
                    'en',
                ], formattingOptions)
                    // Enforce a dot as decimal separator for consistency and parseFloat. Using capturing groups instead of
                    // lookahead/lookbehind to avoid browser support limitations.
                    .replace(FIAT_AMOUNT_DECIMAL_SEPARATOR_REGEX, '$1.$2');
                const regexMatch = formatted.match(FIAT_AMOUNT_NUMBER_REGEX)!;
                const [/* full match */, sign, /* integers */, decimalsIncludingSeparator, decimals] = regexMatch;
                integers = regexMatch[2];
                const formattedNumber = `${sign || ''}${integers}${decimalsIncludingSeparator || ''}`;
                relativeDeviation = Math.abs((props.amount - Number.parseFloat(formattedNumber)) / props.amount);

                const nextDecimals = decimals ? decimals.length + 1 : 1;
                formattingOptions.minimumFractionDigits = nextDecimals;
                formattingOptions.maximumFractionDigits = nextDecimals;
            } while (relativeDeviation > props.maxRelativeDeviation
                && formattingOptions.minimumFractionDigits <= 20 // max for minimumFractionDigits and maximumFractionDigits
                && !props.hideDecimals
            );

            // Replace the currency code with our custom currency symbol.
            formatted = formatted.replace(FIAT_AMOUNT_CURRENCY_CODE_REGEX, (match, position) => {
                if (position !== 0 || !FIAT_AMOUNT_SYMBOL_TRAILING_ALPHA_REGEX.test(currencyInfo.symbol)) {
                    // For trailing currency symbol or currency symbol that does not end with a latin letter or dot do not
                    // append a space, e.g.: 1.00 € (EUR), $1.00 (USD), R$1.00 (BRL), ₼1.00 (AZN), ৳1 (BDT), S/1.00 (PEN)
                    return currencyInfo.symbol;
                }
                // For leading currency symbol that ends with a latin letter or dot, add a (non-breaking) space, e.g.
                // KM 1.00 (BAM), B/. 1.00 (PAB), лв. 1.00 (BGN), kr 1.00 (DKK)
                return `${currencyInfo.symbol}\u00A0`;
            });

            // apply integer grouping
            if (integers.length <= 4) return formatted;
            return formatted.replace(integers, new FormattableNumber(integers).toString(true));
        });

        function _getPositioningLocale(currency: string) {
            // Try to guess a locale which positions the currency symbol in a way typical for countries, where the currency
            // is used, e.g. 1.00€ for eur; $1.00 for usd.
            currency = currency.toLowerCase();
            switch (currency) {
                case 'eur':
                case 'chf':
                    return 'de';
                case 'gbp':
                case 'usd':
                    return 'en';
                case 'cny':
                    return 'zh';
                default:
                    // Return the country from the currency code which is typically (but not necessarily) the first two
                    // letters (see https://en.wikipedia.org/wiki/ISO_4217#National_currencies), in the hope that it
                    // coincides with a locale.
                    // TODO oftentimes this results in the wrong locale, e.g. ARS (Argentinan Peso) -> AR (Arabic),
                    //  CAD (Canadian Dollar) -> CA (Catalan). Can we come up with a better heuristic?
                    return currency.substr(0, 2);
            }
        }

        return { _currencyString };
    }
})
</script>
