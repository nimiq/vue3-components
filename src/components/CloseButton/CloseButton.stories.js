import { action } from '@storybook/addon-actions';
import CloseButton from './CloseButton.vue';

export default {
    title: 'CloseButton',
    component: CloseButton,
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { CloseButton },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <CloseButton class="top-left" @click="action('click')($event)"/>
        </div>
    `,
});

export const Default = Template.bind({});
