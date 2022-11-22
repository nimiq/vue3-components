import { ref } from 'vue';
import AccountList, { AccountListEvent } from './AccountList.vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';

export default {
    title: 'AccountList',
    component: AccountList,
    argTypes: {
        // Props
        accounts: { control: { type: 'object' } },
        disabledAddresses: { control: { type: 'object' } },
        walletId: { control: { type: 'text' } },
        editable: { control: { type: 'boolean' } },
        decimals: { control: { type: 'number' } },
        minBalance: { control: { type: 'number' } },
        disableContracts: { control: { type: 'boolean' } },
        disabled: { control: { type: 'boolean' } },
        tooltipProps: { control: { type: 'object' } },

        // Events
        ...getEventArgTypeFromEnum(AccountListEvent),
    },
};

const Template = (args) => ({
    components: { AccountList },
    setup() {
        const accountList$ = ref(null);

        function focusFirstAddress() {
            if (accountList$.value) accountList$.value.focus(args.accounts[0].userFriendlyAddress);
        }

        return {
            events: getEventListenerFromEnum(AccountListEvent),
            args,
            accountList$,
            focusFirstAddress,
        };
    },
    template: `
        <button class="nq-button-s" @click="focusFirstAddress">Focus first address (editable: true)</button>
        <br />
        <br />
        <AccountList ref="accountList$" v-bind="args" v-on="events" />
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
