import QrScanner, { QrScannerEvents } from './QrScanner.vue';
import SmallPage from '../SmallPage/SmallPage.vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';
import { onMounted, ref } from 'vue';

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

        // Custom Storybook Props
        inversionMode: {
            table: { category: 'Story props' },
            control: { type: 'inline-radio' },
            options: ['original', 'invert', 'both'],
        },
        "grayscaleWeightsRed": {
            table: {
                category: 'Story props',
                subcategory: 'grayscaleWeights',
            },
            name: 'Red',
            control: { type: 'number' },
        },
        "grayscaleWeightsGreen": {
            table: {
                category: 'Story props',
                subcategory: 'grayscaleWeights',
            },
            name: 'Green',
            control: { type: 'number' },
        },
        "grayscaleWeightsBlue": {
            table: {
                category: 'Story props',
                subcategory: 'grayscaleWeights',
            },
            name: 'Blue',
            control: { type: 'number' },
        },
    },
};

export const Default = (args) => ({
    components: { QrScanner, SmallPage },
    setup() {
        const qrScanner$ = ref(null);

        function stop() { if (qrScanner$.value) qrScanner$.value.stop() }
        function start() { if (qrScanner$.value) qrScanner$.value.start() }
        function repositionOverlay() { if (qrScanner$.value) qrScanner$.value.repositionOverlay() }

        onMounted(() => {
            if (qrScanner$.value) {
                qrScanner$.value.setInversionMode(args.inversionMode);
                qrScanner$.value.setGrayscaleWeights(
                    args.grayscaleWeightsRed,
                    args.grayscaleWeightsGreen,
                    args.grayscaleWeightsBlue,
                );
            }
        });

        return {
            events: getEventListenerFromEnum(QrScannerEvents),
            args,
            qrScanner$,
            stop,
            start,
            repositionOverlay,
        };
    },
    template: `
        <button class="nq-button-s" @click="start">Start</button>
        <button class="nq-button-s" @click="stop">Stop</button>
        <button class="nq-button-s" @click="repositionOverlay">repositionOverlay</button>
        <br />
        <br />
        <SmallPage style="height: 560px; overflow: hidden">
            <QrScanner style="height: 100%" v-bind="args" v-on="events" ref="qrScanner$"></QrScanner>
        </SmallPage>
    `,
});
