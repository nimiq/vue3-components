import { action } from '@storybook/addon-actions';
import AccountSelector from './AccountSelector.vue';

export default {
    title: 'AccountSelector',
    component: AccountSelector,
    argTypes: {
        wallets: { control: { type: 'object' } },
        disabledAddresses: { control: { type: 'object' } },
        allowLogin: { control: { type: 'boolean' } },
        decimals: { control: { type: 'number' } },
        minBalance: { control: { type: 'number' } },
        disableContracts: { control: { type: 'boolean' } },
        disableLegacyAccounts: { control: { type: 'boolean' } },
        disableBip39Accounts: { control: { type: 'boolean' } },
        disableLedgerAccounts: { control: { type: 'boolean' } },
        highlightBitcoinAccounts: { control: { type: 'boolean' } },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { AccountSelector },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <AccountSelector
            :wallets="wallets"
            :minBalance="minBalance"
            :decimals="decimals"
            :disableContracts="disableContracts"
            :disableLegacyAccounts="disableLegacyAccounts"
            :disableBip39Accounts="disableBip39Accounts"
            :disableLedgerAccounts="disableLedgerAccounts"
            :highlightBitcoinAccounts="highlightBitcoinAccounts"
            :allowLogin="allowLogin"
            :disabledAddresses="disabledAddresses"

            @account-selected="action('account-selected')($event)"
            @login="action('login')($event)"
        />
    `,
});

export const SingleAccount = Template.bind({});
SingleAccount.args = {
    wallets: [
        {
            id: 'bip39-wallet-id',
            label: 'Keyguard Wallet',
            type: 2, // BIP39
            accounts: [
                {
                    userFriendlyAddress: 'NQ55 VDTM 6PVTN672 SECN JKVD 9KE4 SD91 PCCM',
                    label: 'Primary account',
                    balance: 12023110,
                    path: "m/44'/242'/0'/0'",
                },
                {
                    userFriendlyAddress: 'NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1',
                    label: 'HODL account',
                    balance: 2712415141213,
                    path: "m/44'/242'/0'/1'",
                },
            ],
            contracts: [
                {
                    userFriendlyAddress: 'NQ12 3ASK LDJF ALKS DJFA KLSD FJAK LSDJ FDRE',
                    label: 'My Vesting Contract',
                    balance: 777777777,
                },
            ],
            btcXPub: 'zpub...',
        },
    ],
    disabledAddresses: ['NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1'],
    allowLogin: true,
    minBalance: 500 * 1e5,
    decimals: 2,
    disableContracts: false,
    disableLegacyAccounts: false,
    disableBip39Accounts: false,
    disableLedgerAccounts: false,
    highlightBitcoinAccounts: true,
};

export const MultipleAccounts = Template.bind({});
MultipleAccounts.args = {
    wallets: [
        {
            id: 'bip39-wallet-id',
            label: 'Keyguard Wallet',
            type: 2, // BIP39
            accounts: [
                {
                    userFriendlyAddress: 'NQ55 VDTM 6PVTN672 SECN JKVD 9KE4 SD91 PCCM',
                    label: 'Primary account',
                    balance: 12023110,
                    path: "m/44'/242'/0'/0'",
                },
                {
                    userFriendlyAddress: 'NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1',
                    label: 'HODL account',
                    balance: 2712415141213,
                    path: "m/44'/242'/0'/1'",
                },
            ],
            contracts: [
                {
                    userFriendlyAddress: 'NQ12 3ASK LDJF ALKS DJFA KLSD FJAK LSDJ FDRE',
                    label: 'My Vesting Contract',
                    balance: 777777777,
                },
            ],
            btcXPub: 'zpub...',
        },
        {
            id: 'ledger-wallet-id',
            label: 'Ledger Wallet',
            type: 3, // LEDGER
            accounts: [
                {
                    userFriendlyAddress: 'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
                    label: 'My Ledger Account',
                    balance: 9876543210,
                    path: "44'/242'/0'/0'",
                }
            ],
            contracts: [],
            btcXPub: 'zpub...',
        },
        {
            id: 'legacy-wallet-id',
            label: 'Legacy Wallet',
            type: 1, // LEGACY
            accounts: [
                {
                    userFriendlyAddress: 'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
                    label: 'My Ledger Account',
                    balance: 876543210,
                    path: "44'/242'/0'/0'",
                }
            ],
            contracts: [],
        }
    ],
    disabledAddresses: ['NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1'],
    allowLogin: true,
    minBalance: 500 * 1e5,
    decimals: 2,
    disableContracts: false,
    disableLegacyAccounts: false,
    disableBip39Accounts: false,
    disableLedgerAccounts: false,
    highlightBitcoinAccounts: true,
};
