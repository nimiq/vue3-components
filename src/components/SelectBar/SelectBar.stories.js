import { action } from '@storybook/addon-actions';
import SelectBar from './SelectBar.vue';

export default {
    title: 'SelectBar',
    component: SelectBar,
    argTypes: {
        name: { control: 'text' },
        options: { control: 'object' },
        selectedValue: { control: 'text' },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { SelectBar },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <SelectBar
                :name="name"
                :options="options"
                :selectedValue="selectedValue"
                @changed="action('changed')($event)"
            />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    name: 'select-bar',
    options: [{
        color: 'nq-light-blue-bg',
        value: 0,
        text: 'free',
        index: 0,
    }, {
        color: 'nq-green-bg',
        value: 1,
        text: 'standard',
        index: 1,
    }, {
        color: 'nq-gold-bg',
        value: 2,
        text: 'express',
        index: 2,
    }],
};
