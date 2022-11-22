import { action } from '@storybook/addon-actions';
import { getEventArgTypeFromEnum } from '../../helpers/storybook/EventHelper';
import BottomOverlay, { BottomOverlayEvent, BottomOverlayTheme } from './BottomOverlay.vue';

export default {
    title: 'BottomOverlay',
    component: BottomOverlay,
    argTypes: {
        // Props
        theme: {
            control: { type: 'select' },
            options: Object.values(BottomOverlayTheme),
        },

        // Slots
        default: { control: false },

        //Events
        ...getEventArgTypeFromEnum(BottomOverlayEvent),

        // Custom Storybook Props
        showCloseButton: {
            control: { type: 'boolean' },
            table: { category: 'Story props' }
        }
    },
};

const Template = (args) => ({
    components: { BottomOverlay },
    setup() {
        return {
            args,
            action,
            BottomOverlayEvent,
        };
    },
    template: `
        <BottomOverlay v-bind="args"
            v-on="args.showCloseButton ? { [BottomOverlayEvent.CLOSE]: (...a) => action(BottomOverlayEvent.CLOSE)(a) } : {}">
            I'm a BottomOverlay and can contain arbitrary content.
            Test me on different screen sizes.
        </BottomOverlay>
    `,
});

export const Default = Template.bind({});
Default.args = {
    showCloseButton: true,
};
