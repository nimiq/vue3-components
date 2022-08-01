import { action } from '@storybook/addon-actions';
import BottomOverlay from './BottomOverlay.vue';

export default {
    title: 'BottomOverlay',
    component: BottomOverlay,
    argTypes: {
        theme: { control: { type: 'select', options: ['dark', 'light', 'green'] } },
        showCloseButton: { control: { type: 'boolean' } }
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { BottomOverlay },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <BottomOverlay :theme="theme" v-on="showCloseButton ? { close: (e) => action('close')(e) } : {}">
                I'm a BottomOverlay and can contain arbitrary content.
                Test me on different screen sizes.
            </BottomOverlay>
    </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    theme: 'dark',
    showCloseButton: true,
};
