import FiatAmount from './FiatAmount.vue';

export default {
    title: 'FiatAmount',
    component: FiatAmount,
    argTypes: {
        // Props
        amount: { control: { type: 'number' } },
        currency: { control: { type: 'text' } },
        maxRelativeDeviation: { control: { type: 'number' } },
        hideDecimals: { control: { type: 'boolean' } },
        locale: { control: { type: 'text' } },
    },
};

const Template = (args) => ({
    components: { FiatAmount },
    setup() {
        return { args };
    },
    template: `
        <FiatAmount v-bind="args" />
    `,
});

export const Default = Template.bind({});
Default.args = {
    amount: 12345.67,
    currency: 'eur',
    maxRelativeDeviation: .1,
    locale: navigator.language,
};
