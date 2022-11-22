<template>
    <div class="info-line" :class="{ 'inverse-theme': theme === PaymentInfoLineThemes.INVERSE }">
        <div class="amounts"
            @mouseenter="priceTooltip$ && priceTooltip$.show()"
            @mouseleave="priceTooltip$ && priceTooltip$.hide()"
            @click="priceTooltip$ && Date.now() - lastTooltipToggle > 200 && priceTooltip$.toggle()"
        >
            <Amount
                :currency="cryptoAmount.currency"
                :amount="cryptoAmount.amount"
                :currencyDecimals="cryptoAmount.decimals"
                :minDecimals="0"
                :maxDecimals="Math.min(4, cryptoAmount.decimals)"
            />
            <Tooltip ref="priceTooltip$"
                v-if="fiatAmount"
                :container="tooltipContainer"
                preferredPosition="bottom left"
                :margin="{ left: 8 }"
                :styles="{
                    minWidth: '37rem',
                    padding: '2rem',
                    lineHeight: '1.3',
                }"
                :theme="theme === PaymentInfoLineThemes.INVERSE ? TooltipThemes.INVERSE : TooltipThemes.NORMAL"
                @show="onPriceTooltipToggle(true)"
                @hide="onPriceTooltipToggle(false)"
                @click.stop=""
                class="price-tooltip"
            >
                <template #trigger>
                    <AlertTriangleIcon v-if="isBadRate" />
                    <FiatAmount :currency="fiatAmount.currency" :amount="fiatAmount.amount" />
                </template>
                <template #default>
                    <div class="price-breakdown">
                        <label>{{ $t('Order amount') }}</label>
                        <FiatAmount :currency="fiatAmount.currency" :amount="fiatAmount.amount" />
                        <template v-if="vendorMarkup || vendorMarkup === 0">
                            <label v-if="vendorMarkup >= 0">{{ $t('Vendor crypto markup') }}</label>
                            <label v-else>{{ $t('Vendor crypto discount') }}</label>
                            <div>{{ formattedVendorMarkup }}</div>
                        </template>
                        <label :class="{ 'nq-orange': isBadRate }">
                            {{ $t('Effective rate') }}
                        </label>
                        <div :class="{ 'nq-orange': isBadRate }" v-if="effectiveRate">
                            <FiatAmount :currency="fiatAmount.currency" :amount="effectiveRate"
                                :maxRelativeDeviation=".0001"
                            />
                            / {{ cryptoAmount.currency.toUpperCase() }}
                        </div>
                    </div>
                    <div v-if="rateInfo()"
                        :class="{ 'nq-orange': isBadRate }"
                        class="rate-info info"
                    >
                        {{ rateInfo() }}
                    </div>
                    <div class="free-service-info info">{{ $t('Nimiq provides this service free of charge.') }}</div>
                    <hr>
                    <div class="total">
                        <label>{{ $t('Total') }}</label>
                        <Amount
                            :currency="cryptoAmount.currency"
                            :amount="cryptoAmount.amount"
                            :currencyDecimals="cryptoAmount.decimals"
                            :minDecimals="0"
                            :maxDecimals="Math.min(8, cryptoAmount.decimals)"
                            showApprox
                        />
                    </div>
                    <div v-if="networkFee === undefined || networkFee === null || Number(networkFee) !== 0"
                        class="network-fee-info info"
                    >
                        +
                        <I18n v-if="!isFormattedNetworkFeeZero"
                            path="{amount} suggested network fee"
                            componentName="PaymentInfoLine">
                            <template #amount>
                                <Amount
                                    v-if="networkFee"
                                    :currency="cryptoAmount.currency"
                                    :amount="networkFee"
                                    :currencyDecimals="cryptoAmount.decimals"
                                    :minDecimals="0"
                                    :maxDecimals="Math.min(6, cryptoAmount.decimals)"
                                />
                            </template>
                        </I18n>
                        <template v-else>{{ $t('network fee') }}</template>
                    </div>
                </template>
            </Tooltip>
        </div>
        <div class="arrow-runway">
            <ArrowRightSmallIcon/>
        </div>
        <Account :address="address" :image="shopLogoUrl" :label="originDomain" />
        <Timer
            v-if="startTime && endTime"
            ref="timer$"
            :startTime="startTime"
            :endTime="endTime"
            :theme="theme"
            :tooltipProps="{
                container: tooltipContainer,
                margin: { right: 8 },
            }"
        />
    </div>
</template>

<script lang="ts">
// this imports only the type without bundling the library
type BigInteger = import('big-integer').BigInteger;

import { computed, defineComponent, nextTick, onMounted, onUnmounted, PropType, ref, watch } from 'vue';
import { FiatApiSupportedFiatCurrency, FiatApiSupportedCryptoCurrency, getExchangeRates } from '@nimiq/utils';
import Account from '../Account/Account.vue';
import Timer from '../Timer/Timer.vue';
import Amount, { amountValidator } from '../Amount/Amount.vue';
import FiatAmount from '../FiatAmount/FiatAmount.vue';
import Tooltip, { TooltipThemes } from '../Tooltip/Tooltip.vue';
import { AlertTriangleIcon, ArrowRightSmallIcon } from '../Icons';
import I18n from '../../i18n/I18n';
import { loadI18n } from '../../i18n/I18nComposable';

function cryptoAmountInfoValidator(value: any) {
    return 'amount' in value && 'currency' in value && 'decimals' in value
        && amountValidator(value.amount)
        && typeof value.currency === 'string'
        && typeof value.decimals === 'number' && Number.isInteger(value.decimals);
}

function fiatAmountInfoValidator(value: any) {
    return 'amount' in value && 'currency' in value
        && typeof value.amount === 'number'
        && typeof value.currency === 'string';
}

const PAYMENT_INFO_LINE_REFERENCE_RATE_UPDATE_INTERVAL = 60000; // every minute
const PAYMENT_INFO_LINE_RATE_DEVIATION_THRESHOLD = .1;

export enum PaymentInfoLineThemes {
    NORMAL = 'normal',
    INVERSE = 'inverse',
}

export default defineComponent({
    name: 'PaymentInfoLine',
    props: {
        cryptoAmount: {
            type: Object as PropType<{ amount: number, currency: string, decimals: number }>,
            required: true,
            validator: cryptoAmountInfoValidator,
        },
        fiatAmount: {
            type: Object as PropType<{ amount: number, currency: string }>,
            validator: fiatAmountInfoValidator,
        },
        // Note that vendorMarkup and networkFee have no effect if fiatAmount is not set, as the tooltip in which they
        // appear is only visible when fiatAmount is set. As the fiatAmount was only introduced in the v2 checkout request
        // in the Hub, the tooltip and vendorMarkup and networkFee are thus never visible for v1 checkout requests. This
        // should be ok though as the vendorMarkup also only exists in v2 and the free-service-info doesn't make too much
        // sense for nimiq.shop or the nimiq voting app which are currently the main apps using the v1 checkout.
        vendorMarkup: {
            type: Number,
            validator: (value: any) => value > -1
        },
        networkFee: {
            type: Number as () => number | bigint | BigInteger,
            validator: amountValidator,
        },
        origin: {
            type: String,
            required: true,
        },
        address: String,
        shopLogoUrl: String,
        startTime: Number,
        endTime: Number,
        theme: {
            type: String as PropType<PaymentInfoLineThemes>,
            validator: (value: any) => Object.values(PaymentInfoLineThemes).includes(value),
            default: 'normal',
        },
        tooltipContainer: HTMLElement,
    },
    methods: { $t: loadI18n('PaymentInfoLine') },
    setup(props, context) {
        const timer$ = ref<typeof Timer | null>(null);
        const priceTooltip$ = ref<typeof Tooltip | null>(null);

        const referenceRate = ref<number | null>(null);
        const referenceRateUpdateTimeout = ref(-1);
        const lastTooltipToggle = ref(-1);

        onMounted(() => updateReferenceRate());
        onUnmounted(() => window.clearTimeout(referenceRateUpdateTimeout.value));

        async function setTime(time: number) {
            await nextTick(); // let vue update in case the timer was just added
            if (!timer$.value) return;
            timer$.value.synchronize(time);
        }

        context.expose({ setTime });

        const originDomain = computed(() => {
            return props.origin.split('://')[1];
        });

        const effectiveRate = computed(() => {
            if (!props.fiatAmount) return null;
            // Fiat/crypto rate. Higher fiat/crypto rate means user is paying less crypto for the requested fiat amount
            // and is therefore better for the user. Note: precision loss should be acceptable here.
            return props.fiatAmount.amount / (Number(props.cryptoAmount.amount) / (10 ** props.cryptoAmount.decimals));
        });

        const formattedVendorMarkup = computed(() => {
            if (typeof props.vendorMarkup !== 'number') return null;
            // Convert to percent and round to two decimals. Always ceil to avoid displaying a lower fee than charged or
            // larger discount than applied. Subtract a small epsilon to avoid that numbers get rounded up as a result of
            // floating point imprecision after multiplication. Otherwise formatting for example .07 would result in 7.01%.
            return `${props.vendorMarkup >= 0 ? '+' : ''}${Math.ceil(props.vendorMarkup * 100 * 100 - 1e-10) / 100}%`;
        });

        const isFormattedNetworkFeeZero = computed(() => {
            if (props.networkFee === null || props.networkFee === undefined) return true;
            // Note: While we use the Amount component which does formatting itself, we manually format here to check
            // whether the formatted value is 0. Precision loss should be acceptable here.
            const networkFeeBaseCurrency = Number(props.networkFee) / (10 ** props.cryptoAmount.decimals);
            // Round to maxDecimals used above in the template
            const maxDecimals = Math.min(6, props.cryptoAmount.decimals);
            const roundingFactor = 10 ** maxDecimals;
            return Math.round(networkFeeBaseCurrency * roundingFactor) / roundingFactor === 0;
        });

        const rateDeviation = computed(() => {
            // Compare rates. Convert them from fiat/crypto to crypto/fiat as the user will be paying crypto in the end and
            // the flipped rates can therefore be compared more intuitively. Negative rate deviation is better for the user.
            if (effectiveRate.value === null || referenceRate.value === null) return null;
            const flippedEffectiveRate = 1 / effectiveRate.value;
            const flippedReferenceRate = 1 / referenceRate.value;
            return (flippedEffectiveRate - flippedReferenceRate) / flippedReferenceRate;
        });

        const isBadRate = computed(() => {
            if (rateDeviation.value === null) return false;
            return rateDeviation.value >= PAYMENT_INFO_LINE_RATE_DEVIATION_THRESHOLD
                || (props.vendorMarkup
                    && props.vendorMarkup < 0 // verify promised discount
                    && rateDeviation.value >= props.vendorMarkup + PAYMENT_INFO_LINE_RATE_DEVIATION_THRESHOLD
                );
        });

        const formattedRateDeviation = computed(() => {
            if (rateDeviation.value === null) return null;
            // Converted to absolute percent, rounded to one decimal
            return `${Math.round(Math.abs(rateDeviation.value) * 100 * 10) / 10}%`;
        });

        function rateInfo() {
            const $t = loadI18n('PaymentInfoLine');

            // Note: this method is not a getter / computed property to update on language changes
            if (rateDeviation.value === null || formattedRateDeviation.value === null
                || (Math.abs(rateDeviation.value) < PAYMENT_INFO_LINE_RATE_DEVIATION_THRESHOLD && !isBadRate.value)) {
                return null;
            }

            if (rateDeviation.value < 0 && isBadRate.value) {
                // False discount
                return $t(
                    'Your actual discount is approx. {formattedRateDeviation} compared '
                    + 'to the current market rate (coingecko.com).',
                    { formattedRateDeviation: formattedRateDeviation.value },
                );
            }

            if (rateDeviation.value > 0) {
                return $t(
                    'You are paying approx. {formattedRateDeviation} more '
                    + 'than at the current market rate (coingecko.com).',
                    { formattedRateDeviation: formattedRateDeviation.value },
                );
            } else {
                return $t(
                    'You are paying approx. {formattedRateDeviation} less '
                    + 'than at the current market rate (coingecko.com).',
                    { formattedRateDeviation: formattedRateDeviation.value },
                );
            }
        }

        watch(() => props.cryptoAmount.currency, updateReferenceRate);
        watch(() => props.fiatAmount && props.fiatAmount.currency, updateReferenceRate);
        async function updateReferenceRate() {
            window.clearTimeout(referenceRateUpdateTimeout.value);
            const cryptoCurrency = props.cryptoAmount.currency.toLowerCase() as FiatApiSupportedCryptoCurrency;
            const fiatCurrency = props.fiatAmount
                ? props.fiatAmount.currency.toLowerCase() as FiatApiSupportedFiatCurrency
                : null;

            if (!props.fiatAmount || !fiatCurrency
                || !Object.values(FiatApiSupportedFiatCurrency).includes(fiatCurrency)
                || !Object.values(FiatApiSupportedCryptoCurrency).includes(cryptoCurrency)
            ) {
                referenceRate.value = null;
                return;
            } else {
                const { [cryptoCurrency]: { [fiatCurrency]: newReferenceRate }} = await getExchangeRates([cryptoCurrency], [fiatCurrency]);
                referenceRate.value = newReferenceRate || null;
            }

            referenceRateUpdateTimeout.value = window.setTimeout(
                () => updateReferenceRate(),
                PAYMENT_INFO_LINE_REFERENCE_RATE_UPDATE_INTERVAL,
            );
        }

        function onPriceTooltipToggle(isShow: boolean) {
            lastTooltipToggle.value = Date.now(); // record last toggle to avoid second toggle on click just after mouseover
            if (!isShow) return;
            updateReferenceRate();
        }

        return {
            PaymentInfoLineThemes,
            TooltipThemes,

            timer$,
            priceTooltip$,

            lastTooltipToggle,

            originDomain,
            effectiveRate,
            formattedVendorMarkup,
            isFormattedNetworkFeeZero,
            isBadRate,

            rateInfo,
            onPriceTooltipToggle,
        };
    },
    components: {
        Account,
        Timer,
        Amount,
        FiatAmount,
        Tooltip,
        AlertTriangleIcon,
        ArrowRightSmallIcon,
        I18n,
    },
})
</script>

<style scoped>
    .info-line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        margin: 1.75rem 2.5rem 1rem 2.375rem;
        flex-shrink: 0;
        font-size: 2rem;
        line-height: 1.5;
        font-weight: normal;
    }

    .amounts {
        display: flex;
        flex-direction: column;
        margin-bottom: .125rem;
        cursor: default;
    }

    .amounts > .amount {
        color: var(--nimiq-light-blue);
        font-weight: bold;
    }

    .inverse-theme .amounts > .amount {
        color: var(--nimiq-light-blue-on-dark, var(--nimiq-light-blue));
    }

    .amounts .trigger .nq-icon {
        font-size: 1.625rem;
        color: var(--nimiq-orange);
        vertical-align: middle;
    }

    .amounts .trigger .fiat-amount {
        margin-top: .25rem;
        color: var(--nimiq-blue);
        font-size: 1.625rem;
        line-height: 1;
        font-weight: 600;
        opacity: .6;
    }

    .price-tooltip label {
        font-weight: normal;
    }

    .price-tooltip .price-breakdown {
        display: grid;
        grid-template-columns: 1fr auto;
        column-gap: 2rem;
        row-gap: 1.5rem;
        white-space: nowrap;
    }

    .price-tooltip .price-breakdown label + * {
        justify-self: end;
    }

    .price-tooltip .info {
        font-size: 1.625rem;
        opacity: .5;
    }

    .price-tooltip .rate-info {
        margin-top: .5rem;
    }

    .price-tooltip .rate-info.nq-orange {
        opacity: 1;
    }

    .price-tooltip .free-service-info {
        margin-top: 1.5rem;
        color: var(--nimiq-green);
        opacity: 1;
    }

    .price-tooltip hr {
        margin: 2rem -1rem 1.5rem;
        border: unset;
        border-top: 1px solid currentColor;
        opacity: .2;
    }

    .price-tooltip .total {
        /* The total row is on purpose not part of the grid as the label is shorter and the value longer */
        display: flex;
        justify-content: space-between;
    }

    .price-tooltip .total .amount {
        font-weight: bold;
    }

    .price-tooltip .network-fee-info {
        margin-top: .5rem;
        margin-bottom: -.25rem;
        text-align: right;
        white-space: nowrap;
    }

    .arrow-runway {
        flex-grow: 1;
        min-width: 3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .arrow-runway .nq-icon {
        opacity: 0;
        font-size: 2rem;
        animation: arrow-shooting 2.7s cubic-bezier(.2,.5,.75,.5) infinite;
    }

    @keyframes arrow-shooting {
        0%   { transform: translate3D(-3.5rem, 0, 0); }
        15%  { transform: translate3D(-3.5rem, 0, 0); opacity: 0; }
        30%  { opacity: .2; }
        70%  { opacity: .2; }
        85%  { transform: translate3D(3rem, 0, 0); opacity: 0; }
        100% { transform: translate3D(3rem, 0, 0); }
    }

    .account {
        padding: 0;
        width: auto !important;
        flex-shrink: 1;
    }

    .account:deep(.identicon) {
        min-width: unset;
        width: 3.375rem;
        height: 3.375rem;
        margin-right: 0;
    }

    .account:deep(.account-image) {
        border-radius: .5rem;
        width: 3rem;
        height: 3rem;
        margin-top: 0;
        margin-bottom: 0;
    }

    .account:deep(.label) {
        padding-left: .75rem;
        margin-bottom: .25rem;
        font-weight: unset;
        opacity: 1 !important;
        /* Remove gradient-fade-out and use text-overflow instead */
        mask-image: unset;
        white-space: nowrap;
        text-overflow: fade;
    }

    .timer {
        margin: auto -.5rem auto 1rem;
        flex-shrink: 0;
    }

    .inverse-theme .amounts .trigger .fiat-amount,
    .inverse-theme .arrow-runway .nq-icon,
    .inverse-theme .account:deep(.label) {
        color: white;
    }
</style>
