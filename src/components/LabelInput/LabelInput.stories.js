import { action } from '@storybook/addon-actions';
import LabelInput from './LabelInput.vue';

export default {
    title: 'LabelInput',
    component: LabelInput,
    argTypes: {
        modelValue: { control: 'text', table: { disable: true } },
        maxBytes: { control: 'number' },
        placeholder: { control: 'text' },
        vanishing: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { LabelInput },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <LabelInput
                @changed="action('changed')($event)"
                @input="action('input')($event.target.value)"
                @paste="action('paste')($event.target.value)"
                v-model="modelValue"
                :maxBytes="maxBytes"
                :placeholder="placeholder"
                :vanishing="vanishing"
                :disabled="disabled"
            />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    disabled: false,
    modelValue: '',
};

export const RestrictedTo63Bytes = Template.bind({});
RestrictedTo63Bytes.args = {
    ...Default.args,
    maxBytes: 63,
};
