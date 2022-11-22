import Amount from './Amount.vue';

export default {
    title: 'Amount',
    component: Amount,
    argTypes: {
        // Props
        amount: { control: { type: 'number', expanded: true } },
        decimals: { control: { type: 'number' } },
        minDecimals: { control: { type: 'number' } },
        maxDecimals: { control: { type: 'number' } },
        showApprox: { control: { type: 'boolean' } },
        currency: { control: { type: 'text' } },
        currencyDecimals: { control: { type: 'number' } },
    },
};

const Template = (args) => ({
    components: { Amount },
    setup() {
        return { args };
    },
    template: `
        <Amount v-bind="args" />
    `,
});

export const Default = Template.bind({});
Default.args = {
    amount: 654321,
    minDecimals: 2,
    maxDecimals: 5,
    showApprox: false,
    currency: 'nim',
    currencyDecimals: 5,
};
