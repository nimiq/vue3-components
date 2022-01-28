<template>
    <span class="amount" :class="{ approx: showApprox && isApprox }">
        {{ formattedAmount }}
        <span class="currency" :class="currency">{{ ticker }}</span>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from '@vue/runtime-core';
import { FormattableNumber } from '@nimiq/utils';

type BigInteger = import ('big-integer').BigInteger;

export function amountValidator(value: any): boolean {
    return typeof value === 'number' || typeof value === 'bigint'
        || (value && value.constructor && value.constructor.name.endsWith('Integer'));
}

export default defineComponent({
    name: 'Amount',
    props: {
        // Amount in smallest unit
        amount: {
            required: true,
            validator: amountValidator,
            type: Number as () => number | bigint | BigInteger,
        },
        // If set takes precedence over minDecimals and maxDecimals
        decimals: Number,
        minDecimals: {
            type: Number,
            default: 2,
        },
        maxDecimals: {
            type: Number,
            default: 5,
        },
        showApprox: {
            type: Boolean,
            default: false,
        },
        currency: {
            type: String,
            default: 'nim',
        },
        currencyDecimals: {
            type: Number,
            default: 2,
        },
    },
    setup(props, context) {
        function _validateDecimals(decimals: number | undefined) {
            if (props.decimals !== undefined && decimals !== props.decimals) {
                // skip validation for minDecimals and maxDecimals if they're overwritten by decimals
                return;
            }
            if (
                decimals !== undefined && (
                    decimals < 0
                    || decimals > props.currencyDecimals
                    || !Number.isInteger(decimals)
                )
            ) {
                throw new Error('Amount: decimals is not in range');
            }
        }

        watch(() => props.minDecimals, _validateDecimals, { immediate: true });
        watch(() => props.maxDecimals, _validateDecimals, { immediate: true });
        watch(() => props.decimals, _validateDecimals, { immediate: true });

        const formattedAmount = computed(() => {
            let minDecimals: number;
            let maxDecimals: number;
            if (typeof props.decimals === 'number') {
                minDecimals = maxDecimals = props.decimals;
            } else {
                minDecimals = props.minDecimals;
                maxDecimals = props.maxDecimals;
            }

            return new FormattableNumber(props.amount).moveDecimalSeparator(-props.currencyDecimals)
                .toString({ maxDecimals, minDecimals, useGrouping: true });
        });

        const isApprox = computed(() => {
            return !new FormattableNumber(props.amount).moveDecimalSeparator(-props.currencyDecimals)
                .equals(formattedAmount.value.replace(/\s/g, ''));
        });

        const ticker = computed(() => {
            if (props.currency === 'tnim') return 'tNIM';

            if (props.currency === 'mbtc') return 'mBTC';
            if (props.currency === 'tbtc') return 'tBTC';

            return props.currency.toUpperCase();
        });

        return {
            formattedAmount,
            isApprox,
            ticker,
        };
    }
})
</script>

<style scoped>
    .amount {
        white-space: nowrap;
    }

    .amount.approx::before {
        content: '~ ';
        opacity: 0.5;
    }
</style>
