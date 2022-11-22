import CircleSpinner from './CircleSpinner.vue';

export default {
    title: 'CircleSpinner',
    component: CircleSpinner,
};

export const Default = () => ({
    components: { CircleSpinner },
    template: `
        <CircleSpinner />
    `,
});
