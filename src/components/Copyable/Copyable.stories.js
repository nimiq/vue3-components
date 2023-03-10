import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';
import Copyable, { CopyableEvent } from './Copyable.vue';

export default {
    title: 'Copyable',
    component: Copyable,
    argTypes: {
        // Props
        text: { control: { type: 'text' } },

        // Slots
        default: { control: false },

        // Events
        ...getEventArgTypeFromEnum(CopyableEvent),
    },
};

const Template = (args) => ({
    components: { Copyable },
    setup() {
        return {
            events: getEventListenerFromEnum(CopyableEvent),
            ...args,
        };
    },
    template: `
        <Copyable ref="copyable$" style="margin-top: 7rem;" v-on="events">I'm a text you can copy.</Copyable>
        <Copyable v-on="events">
            I'm a copyable text<br>with <b>child nodes</b>.
        </Copyable>
        <Copyable :text="text" v-on="events">When you click me you get a surprise!</Copyable>
        <button class="nq-button" style="margin-top: 7rem; margin-left: 1rem" @click="$refs.copyable$.copy()">
            Click me to trigger a copy via code
        </button>
    `,
});

export const Default = Template.bind({});
Default.args = {
    text: "Surprise!!!",
};
