import { action } from '@storybook/addon-actions';
import AccountRing from './AccountRing.vue';

export default {
    title: 'AccountRing',
    component: AccountRing,
    argTypes: {
        addresses: { control: { type: 'object' } },
        animate: { control: { type: 'boolean' } },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { AccountRing },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            Atomatic width/height:<br/><br/>
            <AccountRing :addresses="addresses" :animate="animate"/>

            <br/>300px width/height:<br/><br/>
            <AccountRing style="width: 300px;" :addresses="addresses" :animate="animate"/>
        </div>
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
