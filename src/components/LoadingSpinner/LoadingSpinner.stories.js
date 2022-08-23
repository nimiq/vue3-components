import LoadingSpinner from './LoadingSpinner.vue';

export default {
    title: 'LoadingSpinner',
    component: LoadingSpinner,
    argTypes: {
        color: { control: 'color' },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { LoadingSpinner },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div :style="{ color }">
            <LoadingSpinner />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    color: '#0582CA',
};
