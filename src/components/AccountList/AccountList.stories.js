import { action } from '@storybook/addon-actions';
import AccountList from './AccountList.vue';

export default {
    title: 'AccountList',
    component: AccountList,
    argTypes: {
        accounts: { control: { type: 'object' } },
        disabledAddresses: { control: { type: 'object' } },
        walletId: { control: { type: 'text' } },
        editable: { control: { type: 'boolean' } },
        decimals: { control: { type: 'number' } },
        minBalance: { control: { type: 'number' } },
        disableContracts: { control: { type: 'boolean' } },
        disabled: { control: { type: 'boolean' } },
        tooltipProps: { control: { type: 'object' } },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { AccountList },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <AccountList
            walletId="helloworld1"

            :accounts="accounts"
            :decimals="decimals"
            :editable="editable"
            :disabled="disabled"
            :minBalance="minBalance"
            :tooltipProps="tooltipProps"
            :disableContracts="disableContracts"
            :disabledAddresses="disabledAddresses"

            @account-changed="action('account-changed')($event)"
            @account-selected="action('account-selected')($event)"
        />
    `,
});

export const Default = Template.bind({});
Default.args = {
    minBalance: 500 * 1e5,
    decimals: 2,
    editable: false,
    disableContracts: false,
    disabled: false,
    disabledAddresses: ['NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1'],
    tooltipProps: {},
    accounts: [
        {
            userFriendlyAddress: 'NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1',
            label: 'HODL account',
            balance: 2712415141213,
            path: "44'/242'/0'/0'",
        },
        {
            userFriendlyAddress: 'NQ21 YPRN 1KVN BQP5A17U YGD3 HH96 6TKA 6BL4',
            label: 'HODL account 2',
            balance: 100000000,
            path: "44'/242'/0'/1'",
        },
        {
            userFriendlyAddress: 'NQ12 3ASK LDJF ALKS DJFA KLSD FJAK LSDJ FDRE',
            label: 'My Vesting Contract',
            balance: 77777777,
        },
        {
            userFriendlyAddress: 'NQ55 VDTM 6PVTN672 SECN JKVD 9KE4 SD91 PCCM',
            label: 'Primary account',
            balance: 12023110,
            path: "44'/242'/0'/2'",
        },
    ],
};
