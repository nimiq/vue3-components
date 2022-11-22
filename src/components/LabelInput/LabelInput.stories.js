import { ref } from 'vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';
import LabelInput, { LabelInputEvent } from './LabelInput.vue';

export default {
    title: 'LabelInput',
    component: LabelInput,
    argTypes: {
        // Props
        modelValue: {
            control: { type: 'text' },
            table: { disable: true },
        },
        maxBytes: { control: { type: 'number' } },
        placeholder: { control: { type: 'text' } },
        vanishing: { control: { type: 'boolean' } },
        disabled: { control: { type: 'boolean' } },

        // Events
        ...getEventArgTypeFromEnum(LabelInputEvent),

        // TODO: for some reasons the storybook displays an <undefined> event on the story 🤷
        // It would be nice to get rid of it in the future if someone find the reason for it
    },
};

const Template = (args) => ({
    components: { LabelInput },
    setup() {
        const labelInput$ = ref(null);

        function focus() {
            if (labelInput$.value) labelInput$.value.focus();
        }

        return {
            events: getEventListenerFromEnum(LabelInputEvent),
            args,
            labelInput$,
            focus,
        };
    },
    template: `
        <button class="nq-button-s" @click="focus">Focus</button>
        <br />
        <br />
        <LabelInput ref="labelInput$" v-model="args.modelValue" v-bind="args" v-on="events" />
    `,
});

export const Default = Template.bind({});

export const RestrictedTo63Bytes = Template.bind({});
RestrictedTo63Bytes.args = {
    maxBytes: 63,
};
