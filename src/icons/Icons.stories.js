import * as Icons from './Icons';
import Tooltip from '../components/Tooltip/Tooltip.vue';

export default {
    title: 'Icons',
    components: { ...Icons },
    argTypes: {
        // Custom Storybook Props
        color: {
            control: { type: 'color' },
            table: { category: 'Story props' }
        }
    }
};

export const Default = (args) => ({
    components: { ...Icons, Tooltip },
    functional: true,
    setup() {
        const icons = Object.entries(Icons);

        return {
            args,
            icons,
        };
    },
    template: `
        <div :style="{ fontSize: '40px', padding: '16px', color: args.color }" ref="container$">
            <Tooltip v-for="[name, icon] in icons" :container="container$"
                :style="{ margin: '4px' }"
                preferredPosition="bottom right"
            >
                <template #trigger>
                    <Component :is="icon" />
                </template>
                {{ name }}
            </Tooltip>
        </div>
    `,
});
