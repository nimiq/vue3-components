import { ref } from 'vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';
import AmountInput, { AmountInputEvent } from './AmountInput.vue';

export default {
    title: 'AmountInput',
    component: AmountInput,
    argTypes: {
        // Props
        maxFontSize: { control: { type: 'number' } },
        placeholder: { control: { type: 'text' } },
        vanishing: { control: { type: 'boolean' } },
        decimals: { control: { type: 'number' } },
        modelValue: { control: false },

        // Events
        ...getEventArgTypeFromEnum(AmountInputEvent),

        // TODO: for some reasons the storybook displays an <undefined> event on the story 🤷
        // It would be nice to get rid of it in the future if someone find the reason for it
    },
};

export const Default = (args) => ({
    components: { AmountInput },
    setup() {
        const amountInput$ = ref(null);

        function focus() {
            if (amountInput$.value) amountInput$.value.focus();
        }

        return {
            events: getEventListenerFromEnum(AmountInputEvent),
            args,
            amountInput$,
            focus,
        };
    },
    template: `
        <button class="nq-button-s" @click="focus">Focus</button>
        <br />
        <br />
        <AmountInput ref="amountInput$" v-bind="args" v-model="args.modelValue" v-on="events" />
    `,
});
