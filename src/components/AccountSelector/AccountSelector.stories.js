import { getEventListenerFromEnum, getEventArgTypeFromEnum } from '../../helpers/storybook/EventHelper';
import AccountSelector, { AccountSelectorEvent } from './AccountSelector.vue';

export default {
    title: 'AccountSelector',
    component: AccountSelector,
    argTypes: {
        // Props
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

        // Events
        ...getEventArgTypeFromEnum(AccountSelectorEvent),
    },
};

const Template = (args) => ({
    components: { AccountSelector },
    setup() {
        return {
            events: getEventListenerFromEnum(AccountSelectorEvent),
            args,
        };
    },
    template: `
        <AccountSelector v-bind="args" v-on="events" />
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
    minBalance: 500 * 1e5,
    decimals: 2,
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
    minBalance: 500 * 1e5,
    decimals: 2,
};
