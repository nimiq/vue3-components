import CopyableField from './CopyableField.vue';

export default {
    title: 'CopyableField',
    component: CopyableField,
    argTypes: {
        // Props
        modelValue: { control: { type: 'object' } },
        label: { control: { type: 'text' } },
        small: { control: { type: 'boolean' } },
    },
};

const Template = (args) => ({
    components: { CopyableField },
    setup() {
        return { args };
    },
    template: `
        <CopyableField v-bind="args"
            style="color: white; background: var(--nimiq-blue-bg); width: 50rem"
        />
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
