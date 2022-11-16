import { action } from '@storybook/addon-actions';
import AddressDisplay from './AddressDisplay.vue';

export default {
    title: 'AddressDisplay',
    component: AddressDisplay,
    argTypes: {
        address: { control: { type: 'text' } },
        copyable: { control: { type: 'boolean' } },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { AddressDisplay },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { args, action };
    },
    // Then, the spread values can be accessed directly in the template
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
