import CircleSpinner from './CircleSpinner.vue';

export default {
    title: 'CircleSpinner',
    component: CircleSpinner,
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { CircleSpinner },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <CircleSpinner />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {};
