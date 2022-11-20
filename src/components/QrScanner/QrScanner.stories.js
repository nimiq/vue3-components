import QrScanner, { QrScannerEvents } from './QrScanner.vue';
import SmallPage from '../SmallPage/SmallPage.vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';

export default {
    title: 'QrScanner',
    component: QrScanner,
    argTypes: {
        // Props
        reportFrequency: { control: 'number' },
        validate: { table: { disable: true } },

        // Slots
        default: { control: false },

        // Events
        ...getEventArgTypeFromEnum(QrScannerEvents),
    },
};

const Template = (args) => ({
    components: { QrScanner, SmallPage },
    setup() {
        return {
            events: getEventListenerFromEnum(QrScannerEvents),
            args,
        };
    },
    template: `
        <SmallPage style="height: 560px; overflow: hidden">
            <QrScanner style="height: 100%" v-bind="args" v-on="events"></QrScanner>
        </SmallPage>
    `,
});

export const Default = Template.bind({});
Default.args = {
    reportFrequency: 7000,
};
