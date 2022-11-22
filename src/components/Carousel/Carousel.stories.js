import Carousel, { CarouselEvent } from './Carousel.vue';
import SmallPage from '../SmallPage/SmallPage.vue';
import { computed } from 'vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';

export default {
    title: 'Carousel',
    component: Carousel,
    argTypes: {
        // Props
        entries: { control: { type: 'object' } },
        selected: { control: { type: 'text' } },
        entryMargin: { control: { type: 'number' } },
        animationDuration: { control: { type: 'number' } },
        hideBackgroundEntries: { control: { type: 'boolean' } },
        disabled: { control: { type: 'boolean' } },

        // Slots
        entry: { control: false },

        // Events
        ...getEventArgTypeFromEnum(CarouselEvent),

        // Custom Storybook Props
        entryCount: {
            table: { category: 'Story props' },
            control: {
                type: 'range',
                min: 1,
                max: 10,
                step: 1,
            },
        },
    },
};

const Template = (args) => ({
    components: { Carousel, SmallPage },
    setup() {
        const entries = computed(() => args.entries || new Array(parseInt(args.entryCount)).fill('Card-').map((v, i) => `${v}${i}`));

        return {
            events: getEventListenerFromEnum(CarouselEvent),
            args,
            entries,
        };
    },
    template: `
        <Carousel v-bind="{ ...args, entries }" v-on="events">
            <template v-for="entry in entries" v-slot:[entry]>
                <SmallPage style="margin: 0; width: 50rem">{{ entry }}</SmallPage>
            </template>
        </Carousel>
        `,
});

export const Default = Template.bind({});
Default.args = {
    selected: 'Card-1',
    entryMargin: 16,
    animationDuration: 1000,
    hideBackgroundEntries: false,
    disabled: false,

    entryCount: 3,
};
