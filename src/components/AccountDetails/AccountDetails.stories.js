import AccountDetails, { AccountDetailsEvent } from './AccountDetails.vue';
import { ref } from 'vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';

export default {
    title: 'AccountDetails',
    component: AccountDetails,
    argTypes: {
        // Props
        address: { control: { type: 'text' } },
        image: { control: { type: 'text' } },
        label: { control: { type: 'text' } },
        walletLabel: { control: { type: 'text' } },
        balance: { control: { type: 'number' } },
        editable: { control: { type: 'boolean' } },
        placeholder: { control: { type: 'text' } },

        // Events
        ...getEventArgTypeFromEnum(AccountDetailsEvent),
    },
};

const Template = (args) => ({
    components: { AccountDetails },
    setup() {
        const accountDetails$ = ref(null);

        function focus() {
            if (accountDetails$.value) accountDetails$.value.focus();
        }

        return {
            events: getEventListenerFromEnum(AccountDetailsEvent),
            args,
            accountDetails$,
            focus,
        };
    },
    template: `
        <button class="nq-button-s" @click="focus">Focus (editable: true)</button>
        <br />
        <br />
        <AccountDetails ref="accountDetails$" v-bind="args" v-on="events" />
    `,
});

export const Default = Template.bind({});
Default.args = {
    walletLabel: 'Keyguard Wallet',
    address: 'NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1',
    label: 'Savings Account',
    balance: 2712415141213,
};

export const Merchant = Template.bind({});
Merchant.args = {
    address: 'NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1',
    origin: 'https://macces.com',
    // image: 'https://shop.nimiq.com/wp-content/uploads/2018/10/nimiq_signet_rgb_base_size.576px.png',
    image: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png',
};
