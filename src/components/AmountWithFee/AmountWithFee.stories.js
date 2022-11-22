import { FiatApiSupportedFiatCurrency } from '@nimiq/utils';
import { ref } from 'vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';
import AmountWithFee, { AmountWithFeeEvent } from './AmountWithFee.vue';

export default {
    title: 'AmountWithFee',
    component: AmountWithFee,
    argTypes: {
        // Props
        availableBalance: { control: { type: 'number' } },
        fiatAmount: { control: { type: 'number' } },
        fiatCurrency: { options: Object.keys(FiatApiSupportedFiatCurrency) },
        modelValue: { control: false },

        // Events
        ...getEventArgTypeFromEnum(AmountWithFeeEvent),

        // Slots
        'insufficient-balance-error': { control: false },
    },
};

const Template = (args) => ({
    components: { AmountWithFee },
    setup() {
        const amountWithFee$ = ref(null);

        function focus() {
            if (amountWithFee$.value) amountWithFee$.value.focus();
        }

        return {
            events: getEventListenerFromEnum(AmountWithFeeEvent),
            args,
            amountWithFee$,
            focus,
        };
    },
    template: `
        <button class="nq-button-s" @click="focus">Focus</button>
        <br />
        <br />
        <AmountWithFee ref="amountWithFee$" v-bind="args" v-model="args.modelValue" v-on="events"/>
    `,
});

export const Default = Template.bind({});
Default.args = {
    modelValue: { amount: 100000, fee: 0, isValid: true },
    availableBalance: 102000000,
};
