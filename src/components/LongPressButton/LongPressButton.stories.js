import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';
import LongPressButton, { LongPressButtonEvent } from './LongPressButton.vue';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.vue';
import { HexagonIcon } from '../../icons/Icons';

export default {
    title: 'LongPressButton',
    component: LongPressButton,
    argTypes: {
        // Props
        color: { control: { type: 'text' } },
        duration: { control: { type: 'number' } },

        // Events
        ...getEventArgTypeFromEnum(LongPressButtonEvent)
    },
};

const Template = (args) => ({
    components: { LongPressButton, LoadingSpinner, HexagonIcon },
    setup() {
        return {
            events: getEventListenerFromEnum(LongPressButtonEvent),
            args,
        };
    },
    template: `
        <LongPressButton v-bind="args" v-on="events">Hold me tight.</LongPressButton>
        <LongPressButton v-bind="args" v-on="events">
            Sometimes it just clicks...
            <template #subline>but in this case it doesn't.</template>
        </LongPressButton>
        <LongPressButton v-bind="args" v-on="events" style="--label-height: 4rem">
            You can also go fancy
            <HexagonIcon style="width: 4rem; height: 4rem; vertical-align: middle"/>
            <LoadingSpinner style="width: 4rem; height: 4rem; vertical-align: middle"/>
            with arbitrary content
            <template #subline>(Yay 🎉)</template>
        </LongPressButton>
    `,
});

export const Default = Template.bind({});
Default.args = {
    color: 'light-blue',
    duration: 3000,
};
