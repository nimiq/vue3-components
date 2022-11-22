import { action } from '@storybook/addon-actions';
import PageHeader from '../PageHeader/PageHeader.vue';
import SmallPage from '../SmallPage/SmallPage.vue';
import PageBody from '../PageBody/PageBody.vue';
import Account from '../Account/Account.vue';
import Tooltip, { TooltipThemes } from './Tooltip.vue';
import { computed, ref } from 'vue';

export default {
    title: 'Tooltip',
    component: Tooltip,
    argTypes: {
        useContainer: { control: { type: 'boolean' } },
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
        trigger: { table: { disable: true } },
        icon: { table: { disable: true } },
        default: { table: { disable: true } },
        container: { table: { disable: true } },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { Tooltip, SmallPage, PageHeader, PageBody, Account },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        const tooltip$ = ref(null);
        const container$ = ref(null);

        const shown = ref(false);

        const container = computed(() => {
            if (!container$.value || !args.useContainer) return undefined;
            return container$.value.$el;
        });

        // Story args can be spread into the returned object
        return {
            ...args,
            tooltip$,
            container$,
            container,
            shown,
            action,
        };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <SmallPage :class="{ 'nq-blue-bg': theme === 'inverse' }">
            <PageHeader>Test</PageHeader>
            <PageBody ref="container$" style="overflow-y: scroll; background: rgba(127,127,127,.1)">
                <div style="height: 320px"></div>
                <div style="max-width: 100%; display: flex; align-items: center;">
                    <button class="nq-button-s" :class="[theme]" @click="tooltip$ && tooltip$.show()">
                        Show
                    </button>
                    &nbsp;or&nbsp;
                    <button class="nq-button-s" :class="[theme]" @click="tooltip$ && tooltip$.hide()">
                        hide
                    </button>
                    &nbsp;or hover me:&nbsp;
                    <Tooltip ref="tooltip$"
                        :container="container"
                        :preferredPosition="preferredPosition"
                        :margin="margin"
                        :autoWidth="autoWidth"
                        :disabled="disabled"
                        :theme="theme"
                        :styles="styles"
                        @show="shown = true; action('show')($event)"
                        @hide="shown = false; action('hide')($event)"
                    >
                        <div style="font-size: 2rem; min-width: 25rem">
                            This is the Tooltip I was talking about.
                            <Account address="NQ55 VDTM 6PVTN672 SECN JKVD 9KE4 SD91 PCCM" />
                        </div>
                    </Tooltip>
                </div>
                <div>
                    Shown: {{shown}}
                </div>
                <div style="height:3000px"></div>
            </PageBody>
        </SmallPage>
    `,
});

export const Default = Template.bind({});
Default.args = {
    useContainer: true,
    preferredPosition: 'top right',
    margin: {},
    autoWidth: false,
    disabled: false,
    theme: TooltipThemes.NORMAL,
    styles: {},
    noFocus: false,
};
