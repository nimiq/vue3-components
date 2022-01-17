import { action } from '@storybook/addon-actions'
import AmountInput from './AmountInput.vue';

export default {
  title: 'AmountInput',
  component: AmountInput,
};

const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { AmountInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    // Story args can be spread into the returned object
    return { ...args };
  },
  // Then, the spread values can be accessed directly in the template
  template: `<AmountInput
    :modelValue="modelValue"
    @update:modelValue="input"
    :max="max"
    :placeholder="placeholder"
    :decimals="decimals"
    :preserveSign="preserveSign"
  />`,

  methods: {
    input: action('update:modelValue')
  },
});

export const Default = Template.bind({});
// Default.args = {
//   max: 1000,
//   placeholder: '0.00',

// };
