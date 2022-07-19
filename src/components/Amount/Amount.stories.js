import { action } from '@storybook/addon-actions';
import Amount from './Amount.vue';

export default {
    title: 'Amount',
    component: Amount,
    argTypes: {
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
    // Components used in your story `template` are defined in the `components` object
    components: { Amount },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <Amount
                :amount="amount"
                :decimals="decimals"
                :minDecimals="minDecimals"
                :maxDecimals="maxDecimals"
                :showApprox="showApprox"
                :currency="currency"
                :currencyDecimals="currencyDecimals"
            />
        </div>
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
