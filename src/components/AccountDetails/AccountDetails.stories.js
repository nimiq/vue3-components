import { action } from '@storybook/addon-actions';
import AccountDetails from './AccountDetails.vue';
import { computed, ref } from 'vue';

export default {
    title: 'AccountDetails',
    component: AccountDetails,
    argTypes: {
        address: { control: { type: 'text' } },
        image: { control: { type: 'text' } },
        label: { control: { type: 'text' } },
        walletLabel: { control: { type: 'text' } },
        balance: { control: { type: 'number' } },
        editable: { control: { type: 'boolean' } },
        placeholder: { control: { type: 'text' } },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { AccountDetails },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        const accountDetails$ = ref(null);

        function focus() {
            if (accountDetails$.value) accountDetails$.value.focus();
        }

        // Story args can be spread into the returned object
        return { args, accountDetails$, focus, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <button class="nq-button-s" @click="focus">Focus (editable: true)</button>
        <br />
        <br />
        <AccountDetails ref="accountDetails$" v-bind="args"
            @changed="action('changed')($event)"
            @close="action('close')($event)"
        />
    `,
});

export const Default = Template.bind({});
Default.args = {
    walletLabel: 'Keyguard Wallet',
    address: 'NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1',
    label: 'Savings Account',
    balance: 2712415141213,
    editable: false,
};

export const Merchant = Template.bind({});
Merchant.args = {
    address: 'NQ33 DH76 PHUKJ41Q LX3A U4E0 M0BM QJH9 QQL1',
    origin: 'https://macces.com',
    // image: 'https://shop.nimiq.com/wp-content/uploads/2018/10/nimiq_signet_rgb_base_size.576px.png',
    image: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png',
    editable: false,
};
