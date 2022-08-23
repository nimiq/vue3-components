import { action } from '@storybook/addon-actions';
import Copyable from './Copyable.vue';

export default {
    title: 'Copyable',
    component: Copyable,
    argTypes: {
        text: { control: 'text' },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { Copyable },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <Copyable ref="copyable" style="margin-top: 7rem;">I'm a text you can copy.</Copyable>
            <Copyable>
                I'm a copyable text<br>with <b>child nodes</b>.
            </Copyable>
            <Copyable :text="text">When you click me you get a surprise!</Copyable>
            <button class="nq-button" style="margin-top: 7rem; margin-left: 1rem" @click="$refs.copyable.copy()">
                Click me to trigger a copy via code
            </button>
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    text: "Surprise!!!",
};
