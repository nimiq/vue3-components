import { action } from '@storybook/addon-actions';
import AccountRing from './AccountRing.vue';

export default {
    title: 'AccountRing',
    component: AccountRing,
    argTypes: {
        // Props
        addresses: { control: { type: 'object' } },
        animate: { control: { type: 'boolean' } },
    },
};

const Template = (args) => ({
    components: { AccountRing },
    setup() {
        return { args, action };
    },
    template: `
        Atomatic width/height:
        <br/><br/>
        <AccountRing v-bind="args"/>
        <br/>
        300px width/height:
        <br/><br/>
        <AccountRing v-bind="args" style="width: 300px;"/>
    `,
});

export const Default = Template.bind({});
Default.args = {
    addresses: [
        'NQ12 3ASK LDJF ALKS DJFA KLSD FJAK LSDJ FDRE',
        'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
        'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',

    ],
    animate: true,
};

export const MoreThanSix = Template.bind({});
MoreThanSix.args = {
    addresses: [
        'NQ12 3ASK LDJF ALKS DJFA KLSD FJAK LSDJ FDRE',
        'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
        'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
        'NQ12 3ASK LDJF ALKS DJFA KLSD FJAK LSDJ FDRE',
        'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
        'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
        'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
        'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
        'NQ76 F8M9 1VJ9 K88B TXDY ADT3 F08D QLHY UULK',
    ],
    animate: true,
};

export const Empty = Template.bind({});
Empty.args = {
    addresses: [],
    animate: true,
};
