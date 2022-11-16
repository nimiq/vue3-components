import Identicon from './Identicon.vue';

export default {
    title: 'Identicon',
    component: Identicon,
    argTypes: {
        address: { control: 'text' },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { Identicon },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { args };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <Identicon v-bind="args"/>
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    address: 'NQ07 0000 00000000 0000 0000 0000 0000 0000',
};
