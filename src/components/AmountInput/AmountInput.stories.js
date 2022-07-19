import { action } from '@storybook/addon-actions'
import { ref, watch } from 'vue';
import AmountInput from './AmountInput.vue';

export default {
    title: 'AmountInput',
    component: AmountInput,
    argTypes: {
        maxFontSize: { control: { type: 'number' } },
        placeholder: { control: { type: 'text' } },
        vanishing: { control: { type: 'boolean' } },
        decimals: { control: { type: 'number' } },
        modelValue: {
            control: { type: 'number' },
            table: { disable: true },
        },
    },
    args: {
        maxFontSize: 8,
        placeholder: '0',
        vanishing: false,
        decimals: 5,
        modelValue: 0,
    }
};

export const Default = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { AmountInput },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <AmountInput
            v-model="modelValue"
            @update:modelValue="action('update:modelValue')($event)"
            :maxFontSize="maxFontSize"
            :placeholder="placeholder"
            :vanishing="vanishing"
            :decimals="decimals"
        />
    `,
});
