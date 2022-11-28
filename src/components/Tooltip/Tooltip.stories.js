import { action } from '@storybook/addon-actions';
import PageHeader from '../PageHeader/PageHeader.vue';
import SmallPage from '../SmallPage/SmallPage.vue';
import PageBody from '../PageBody/PageBody.vue';
import Account from '../Account/Account.vue';
import Tooltip, { TooltipThemes, TooltipEvents } from './Tooltip.vue';
import { computed, ref } from 'vue';
import { getEventArgTypeFromEnum, getEventListenerFromEnum } from '../../helpers/storybook/EventHelper';

export default {
    title: 'Tooltip',
    component: Tooltip,
    argTypes: {
        // Props
        disabled: { control: { type: 'boolean' } },
        noFocus: { control: { type: 'boolean' } },
        preferredPosition: {
            control: { type: 'select' },
            options: ['top', 'bottom', 'top left', 'top right', 'bottom left', 'bottom right'],
        },
        margin: { control: { type: 'object' } },
        autoWidth: { control: { type: 'boolean' } },
        theme: {
            control: { type: 'select' },
            options: Object.values(TooltipThemes),
        },
        styles: { control: { type: 'object' } },
        container: { control: false },

        // Slots
        trigger: { control: false },
        default: { control: false },
        icon: { control: false },

        // Events
        ...getEventArgTypeFromEnum(TooltipEvents),

        // Custom Storybook Props
        useContainer: {
            control: { type: 'boolean' },
            table: { category: 'Story props' }
        },
    },
};

const Template = (args) => ({
    components: { Tooltip, SmallPage, PageHeader, PageBody, Account },
    setup() {
        const tooltip$ = ref(null);
        const container$ = ref(null);

        const shown = ref(false);

        const container = computed(() => {
            if (!container$.value || !args.useContainer) return undefined;
            return container$.value.$el;
        });

        return {
            events: getEventListenerFromEnum(TooltipEvents),
            args,
            tooltip$,
            container$,
            container,
            shown,
            action,
        };
    },
    template: `
        <SmallPage :class="{ 'nq-blue-bg': args.theme === 'inverse' }">
            <PageHeader>Test</PageHeader>
            <PageBody ref="container$" style="overflow-y: scroll; background: rgba(127,127,127,.1)">
                <div style="height: 320px"></div>
                <div style="max-width: 100%; display: flex; align-items: center;">
                    <button class="nq-button-s" :class="[args.theme]" @click="tooltip$ && tooltip$.show()">
                        Show
                    </button>
                    &nbsp;or&nbsp;
                    <button class="nq-button-s" :class="[args.theme]" @click="tooltip$ && tooltip$.hide()">
                        hide
                    </button>
                    &nbsp;or hover me:&nbsp;
                    <Tooltip ref="tooltip$" v-bind="args" v-on="events" :container="container"
                        @show="shown = true;"
                        @hide="shown = false;"
                    >
                        <div style="font-size: 2rem; min-width: 25rem">
                            This is the Tooltip I was talking about.
                            <Account address="NQ55 VDTM 6PVTN672 SECN JKVD 9KE4 SD91 PCCM" />
                        </div>
                    </Tooltip>
                </div>
                <div>
                    Shown: {{ shown }}
                </div>
                <div style="height:3000px"></div>
            </PageBody>
        </SmallPage>
    `,
});

export const Default = Template.bind({});
Default.args = {
    useContainer: true,
};
