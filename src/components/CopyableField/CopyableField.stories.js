import CopyableField from './CopyableField.vue';

export default {
    title: 'CopyableField',
    component: CopyableField,
    argTypes: {
        modelValue: { control: 'object' },
        label: { control: 'text' },
        small: { control: 'boolean' },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { CopyableField },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <CopyableField
                :label="label"
                :modelValue="modelValue"
                :small="small"
                style="color: white; background: var(--nimiq-blue-bg); width: 50rem"
            />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    modelValue: {
        a: 'Value a',
        b: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    },
    label: 'Copyable field',
    small: false,
};
