import ShinyIdenticon from './ShinyIdenticon.vue';

export default {
    title: 'ShinyIdenticon',
    component: ShinyIdenticon,
    argTypes: {
        // Props
        address: { control: { type: 'text' } },
        material: { 
            control: { type: 'select' },
            options: ['bronze', 'silver', 'gold'],
            required: true
        },
        shouldValidateAddress: { control: { type: 'boolean' } },
    },
};

const Template = (args) => ({
    components: { ShinyIdenticon },
    setup() {
        return { args };
    },
    template: `
        <ShinyIdenticon v-bind="args"/>
    `,
});

export const Default = Template.bind({});
Default.args = {
    address: 'NQ07 0000 00000000 0000 0000 0000 0000 0000',
    shouldValidateAddress: true,
    material: 'bronze'
};
