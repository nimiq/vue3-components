<template>
    <div class="amount-with-fee">
        <AmountInput class="value" v-model="liveAmount" :class="{ invalid: !isValid && liveAmount > 0 }"  ref="amountInput" />
        <div class="fee-section nq-text-s">
            <div v-if="!isValid && liveAmount" class="nq-red"><slot name="insufficient-balance-error">{{ $t('Insufficient balance') }}</slot></div>
            <div v-else>
                <span v-if="fiatAmount && fiatCurrency" class="fiat">
                    ~<FiatAmount :amount="fiatAmount" :currency="fiatCurrency" />
                </span>
                <span v-if="modelValue.fee" class="fee">
                    + <Amount :amount="modelValue.fee" :minDecimals="0" :maxDecimals="5" /> {{ $t('fee') }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

import { FiatApiSupportedFiatCurrency } from '@nimiq/utils';
import Amount from '../Amount/Amount.vue';
import AmountInput from '../AmountInput/AmountInput.vue';
import FiatAmount from '../FiatAmount/FiatAmount.vue';
import { loadI18n } from '../../i18n/I18nComposable';

export default defineComponent({
    name: 'AmountWithFee',
    props: {
        modelValue: {
            type: Object as () => ({ amount: number, fee: number, isValid: boolean }),
            default: () => ({ amount: 0, fee: 0, isValid: false }),
        },
        availableBalance: {
            type: Number,
            default: 0,
        },
        fiatAmount: Number,
        fiatCurrency: String as () => FiatApiSupportedFiatCurrency,
    },
    methods: { $t: loadI18n('AmountWithFee') },
    setup(props, context) {
        const amountInput$ = ref<(typeof AmountInput) | null>(null);

        const liveAmount = ref(props.modelValue.amount);

        const isValid = computed(() => {
            return liveAmount.value > 0
                && liveAmount.value + props.modelValue.fee <= props.availableBalance;
        });

        onMounted(watchAmountChange);

        watch(isValid, watchAvailableAmountChange, { immediate: true });
        function watchAvailableAmountChange() {
            context.emit('input', { amount: liveAmount.value, fee: props.modelValue.fee, isValid: isValid.value });
        }

        watch(liveAmount, watchAmountChange, { immediate: true });
        function watchAmountChange() {
            context.emit('input', { amount: liveAmount.value, fee: props.modelValue.fee, isValid: isValid.value });
        }

        function focus() {
            if (amountInput$.value) amountInput$.value.focus();
        }

        context.expose({ focus });

        return {
            amountInput$,
            liveAmount,
            isValid,
        };
    },
    components: {
        Amount,
        AmountInput,
        FiatAmount,
    },
})
</script>

<style scoped>
    .amount-with-fee {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    .value {
        display: flex;
        align-items: baseline;
    }

    .amount-input:deep(input) {
        padding-top: 0;
        padding-bottom: 0;
    }

    .amount-input.invalid:deep(input),
    .amount-input.invalid:deep(.nim) {
        border-color: rgb(216, 65, 51, 0.2); /* Based on Nimiq Red */
        color: var(--nimiq-red) !important;
    }

    .fee-section {
        color: rgba(31, 35, 72, 0.5);
        min-height: 2rem;
    }

    .fiat {
        display: inline-flex;
    }
</style>
