import { action } from '@storybook/addon-actions';
import Account from './Account.vue';

export default {
    title: 'Account',
    component: Account,
    argTypes: {
        label: { control: { type: 'text' } },
        displayAsCashlink: { control: { type: 'boolean' } },
        decimals: { control: { type: 'range', min: 2, max: 5, step: 1 } },
        layout: {
            control: { type: 'select' },
            options: ['row', 'column'],
        },
        address: { control: { type: 'text' } },
        image: { control: { type: 'text' } },
        placeholder: { control: { type: 'text' } },
        walletLabel: { control: { type: 'text' } },
        balance: { control: { type: 'number' } },
        editable: { control: { type: 'boolean' } },
    },
    args: {
        label: 'My Account',
        balance: 100000,
        decimals: 2,
    }
};

export const Default = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { Account },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <Account ref="account"
            :label="label"
            :displayAsCashlink="displayAsCashlink"
            :decimals="decimals"
            :layout="layout"
            :address="address"
            :image="image"
            :placeholder="placeholder"
            :walletLabel="walletLabel"
            :balance="balance"
            :editable="editable"
            @changed="action('changed')($event)"
        />
    `,
});
