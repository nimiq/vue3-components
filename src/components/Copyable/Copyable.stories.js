import Copyable from './Copyable.vue';

export default {
    title: 'Copyable',
    component: Copyable,
    argTypes: {
        // Props
        text: { control: { type: 'text' } },

        // Slots
        default: { control: false },
    },
};

const Template = (args) => ({
    components: { Copyable },
    setup() {
        return { ...args };
    },
    template: `
        <Copyable ref="copyable$" style="margin-top: 7rem;">I'm a text you can copy.</Copyable>
        <Copyable>
            I'm a copyable text<br>with <b>child nodes</b>.
        </Copyable>
        <Copyable :text="text">When you click me you get a surprise!</Copyable>
        <button class="nq-button" style="margin-top: 7rem; margin-left: 1rem" @click="$refs.copyable$.copy()">
            Click me to trigger a copy via code
        </button>
    `,
});

export const Default = Template.bind({});
Default.args = {
    text: "Surprise!!!",
};
