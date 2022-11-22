import Identicon from './Identicon.vue';

export default {
    title: 'Identicon',
    component: Identicon,
    argTypes: {
        // Props
        address: { control: { type: 'text' } },
    },
};

const Template = (args) => ({
    components: { Identicon },
    setup() {
        return { args };
    },
    template: `
        <Identicon v-bind="args"/>
    `,
});

export const Default = Template.bind({});
Default.args = {
    address: 'NQ07 0000 00000000 0000 0000 0000 0000 0000',
};
