import FiatAmount from './FiatAmount.vue';

export default {
    title: 'FiatAmount',
    component: FiatAmount,
    argTypes: {
        amount: { control: 'number' },
        currency: { control: 'text' },
        maxRelativeDeviation: { control: 'number' },
        hideDecimals: { control: 'boolean' },
        locale: { control: 'text' },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { FiatAmount },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { args };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <FiatAmount v-bind="args" />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    amount: 12345.67,
    currency: 'eur',
    maxRelativeDeviation: .1,
    locale: navigator.language,
    hideDecimals: false,
};
