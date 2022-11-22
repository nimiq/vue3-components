import { action } from '@storybook/addon-actions';
import CloseButton from './CloseButton.vue';

export default {
    title: 'CloseButton',
    component: CloseButton,
};

const Template = (args) => ({
    components: { CloseButton },
    setup() {
        return { ...args, action };
    },
    template: `
        <CloseButton class="top-left" @click="action('click')($event)"/>
    `,
});

export const Default = Template.bind({});
