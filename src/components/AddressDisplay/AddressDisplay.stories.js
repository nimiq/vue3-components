import AddressDisplay from './AddressDisplay.vue';

export default {
    title: 'AddressDisplay',
    component: AddressDisplay,
    argTypes: {
        // Props
        address: { control: { type: 'text' } },
        copyable: { control: { type: 'boolean' } },
        format: {
            control: { type: 'select' },
            options: ['nimiq', 'ethereum'],
        },
    },
};

const Template = (args) => ({
    components: { AddressDisplay },
    setup() {
        return { args };
    },
    template: `
        <AddressDisplay v-bind="args"
            style="margin-top: 7rem; margin-left: 2rem;"
        />
    `,
});

export const Default = Template.bind({});
Default.args = {
    address: 'NQ12 3ASK LDJF ALKS DJFA KLSD FJAK LSDJ FDRE',
    copyable: false,
};
