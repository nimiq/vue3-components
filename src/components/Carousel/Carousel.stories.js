import { action } from '@storybook/addon-actions';
import Carousel from './Carousel.vue';
import SmallPage from '../SmallPage/SmallPage.vue';
import { computed } from 'vue';

export default {
    title: 'Carousel',
    component: Carousel,
    argTypes: {
        // Props
        entries: { control: 'object' },
        selected: { control: 'text' },
        entryMargin: { control: 'number' },
        animationDuration: { control: 'number' },
        hideBackgroundEntries: { control: 'boolean' },
        disabled: { control: 'boolean' },
        // Custom controls
        entryCount: { control: 'number' },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { Carousel, SmallPage },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        const entries = computed(() => args.entries || new Array(parseInt(args.entryCount)).fill('Card-').map((v, i) => `${v}${i}`));

        function onSelect(entry) {
            action('select')(entry);
            args.selected = entry;
        }

        // Story args can be spread into the returned object
        return { args: { ...args, entries }, action, onSelect };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <Carousel v-bind="args" @select="onSelect">
                <template v-for="entry in entries" v-slot:[entry]>
                    <SmallPage style="margin: 0; width: 50rem">{{ entry }}</SmallPage>
                </template>
            </Carousel>
        </div>
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
