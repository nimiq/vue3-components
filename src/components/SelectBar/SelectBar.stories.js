import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';
import SelectBar, { SelectBarEvent } from './SelectBar.vue';

export default {
    title: 'SelectBar',
    component: SelectBar,
    argTypes: {
        // Props
        name: { control: { type: 'text' } },
        options: { control: { type: 'object' } }, // SelectBarOption imported from SelectBar.vue
        selectedValue: { control: { type: 'text' } },

        // Events
        ...getEventArgTypeFromEnum(SelectBarEvent),
    },
};

const Template = (args) => ({
    components: { SelectBar },
    setup() {
        return {
            events: getEventListenerFromEnum(SelectBarEvent),
            args,
        };
    },
    template: `
        <SelectBar v-bind="args" v-on="events" />
    `,
});

export const Default = Template.bind({});
Default.args = {
    name: 'select-bar',
    options: [{
        color: 'nq-light-blue-bg',
        text: 'free',
        value: 0,
        index: 0,
    }, {
        color: 'nq-green-bg',
        text: 'standard',
        value: 1,
        index: 1,
    }, {
        color: 'nq-gold-bg',
        text: 'express',
        value: 2,
        index: 2,
    }],
};
