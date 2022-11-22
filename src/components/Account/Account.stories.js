import { ref } from 'vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';
import Account, { AccountLayout, AccountEvent } from './Account.vue';

export default {
    title: 'Account',
    component: Account,
    argTypes: {
        // Props
        label: { control: { type: 'text' } },
        displayAsCashlink: { control: { type: 'boolean' } },
        decimals: { control: { type: 'range', min: 0, max: 5, step: 1 } },
        layout: {
            control: { type: 'inline-radio' },
            options: Object.values(AccountLayout),
        },
        address: { control: { type: 'text' } },
        image: { control: { type: 'text' } },
        placeholder: { control: { type: 'text' } },
        walletLabel: { control: { type: 'text' } },
        balance: { control: { type: 'number' } },
        editable: { control: { type: 'boolean' } },

        // Events
        ...getEventArgTypeFromEnum(AccountEvent),
    },
};

const Template = (args) => ({
    components: { Account },
    setup() {
        const account$ = ref(null);

        function focus() {
            if (account$.value) account$.value.focus();
        }

        return {
            events: getEventListenerFromEnum(AccountEvent),
            args,
            focus,
            account$,
        };
    },
    template: `
        <button class="nq-button-s" @click="focus">Focus (editable: true)</button>
        <br />
        <br />
        <Account ref="account$" v-bind="args" v-on="events" />
    `,
});

export const Default = Template.bind({});
Default.args = {
    label: 'My Account',
    decimals: 2,
    balance: 100000,
};
