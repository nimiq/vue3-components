import { FiatApiSupportedFiatCurrency } from '@nimiq/utils';
import { action } from '@storybook/addon-actions';
import AmountWithFee from './AmountWithFee.vue';

export default {
    title: 'AmountWithFee',
    component: AmountWithFee,
    argTypes: {
        modelValue: {
            control: { type: 'object' },
            table: { disable: true },
        },
        availableBalance: { control: { type: 'number' } },
        fiatAmount: { control: { type: 'number' } },
        fiatCurrency: { options: Object.keys(FiatApiSupportedFiatCurrency) }
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { AmountWithFee },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div style="padding-left: 20rem">
            <AmountWithFee
                v-model="modelValue"
                :available-balance="availableBalance"
                :fiatAmount="fiatAmount"
                :fiatCurrency="fiatCurrency"
                @input="action('input')($event)"
            />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    modelValue: { amount: 100000, fee: 0, isValid: true },
    availableBalance: 102000000,
};
