import { ref } from 'vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';
import AddressInput, { AddressInputEvent } from './AddressInput.vue';

export default {
    title: 'AddressInput',
    component: AddressInput,
    argTypes: {
        // Props
        allowNimAddresses: { control: { type: 'boolean' } },
        allowEthAddresses: { control: { type: 'boolean' } },
        allowDomains: { control: { type: 'boolean' } },
        modelValue: { control: false },
        autofocus: { control: { type: 'boolean' } },

        // Events
        ...getEventArgTypeFromEnum(AddressInputEvent)
    },
};

const Template = (args) => ({
    components: { AddressInput },
    setup() {
        const addressInput$ = ref(null);

        function focus() {
            if (addressInput$.value) addressInput$.value.focus();
        }

        return {
            events: getEventListenerFromEnum(AddressInputEvent),
            args,
            addressInput$,
            focus,
        };
    },
    template: `
        <button class="nq-button-s" @click="focus">Focus</button>
        <br />
        <br />
        <AddressInput ref="addressInput$" v-model="args.modelValue" v-bind="args" v-on="events" />
    `,
});

export const Default = Template.bind({});
Default.args = {
    allowNimAddresses: true,
    allowEthAddresses: false,
    allowDomains: false,
    autofocus: false,
};
