import LoadingSpinner from './LoadingSpinner.vue';

export default {
    title: 'LoadingSpinner',
    component: LoadingSpinner,
    argTypes: {
        // Custom Storybook Props
        color: {
            control: { type: 'color' },
            table: { category: 'Story props' }
        }
    },
};

export const Default = (args) => ({
    components: { LoadingSpinner },
    setup() {
        return { ...args };
    },
    template: `
        <div :style="{ color }">
            <LoadingSpinner />
        </div>
    `,
});
