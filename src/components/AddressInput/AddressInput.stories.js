import { action } from '@storybook/addon-actions';
import AddressInput from './AddressInput.vue';

export default {
    title: 'AddressInput',
    component: AddressInput,
    argTypes: {
        autofocus: { control: { type: 'boolean' } },
        allowDomains: { control: { type: 'boolean' } },
        modelValue: {
            control: { type: 'text' },
            table: { disable: true },
        },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { AddressInput },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <AddressInput v-model="args.modelValue" v-bind="args"
                @update:modelValue="action('update:modelValue')($event)"
                @address="action('address')($event); lastValidAddress = $event"
                @paste="action('paste')($event)"
            />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    allowDomains: true,
    autofocus: false,
    modelValue: '',
};
