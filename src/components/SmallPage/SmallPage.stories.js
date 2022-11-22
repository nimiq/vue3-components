import { action } from '@storybook/addon-actions';
import SmallPage from './SmallPage.vue';
import PageHeader, { PageHeaderEvent } from '../PageHeader/PageHeader.vue';
import PageBody from '../PageBody/PageBody.vue';
import PageFooter from '../PageFooter/PageFooter.vue';

export default {
    title: 'SmallPage',
    component: SmallPage,
    subcomponents: { PageHeader, PageBody, PageFooter },
    argTypes: {
        // PageHeader Props
        backArrow: {
            table: { category: 'PageHeader Props' },
            control: { type: 'boolean' },
        },
        progressIndicator: {
            table: { category: 'PageHeader Props' },
            control: { type: 'boolean' },
        },
        numberSteps: {
            table: { category: 'PageHeader Props' },
            control: { type: 'number' },
        },
        step: {
            table: { category: 'PageHeader Props' },
            control: { type: 'number' },
        },

        // PageHeader events
        [PageHeaderEvent.BACK]: {
            table: { category: 'PageHeader Events' },
            control: false,
        },

        // SmallPage Slots
        default: {
            table: { category: 'SmallPage Slots' },
            control: false,
        },
    },
};

export const Default = (args) => ({
    components: {
        SmallPage,
        PageHeader,
        PageBody,
        PageFooter,
    },
    setup() {
        return {
            args,
            action,
            PageHeaderEvent,
        };
    },
    template: `
        <SmallPage>
            <PageHeader v-bind="args" @[PageHeaderEvent.BACK]="action(PageHeaderEvent.BACK)()">
                Page header
                <p slot="more" class="nq-notice info">I am an informative notice!</p>
            </PageHeader>
            <PageBody>
                <p>Some text in the page body.</p>
            </PageBody>
            <PageFooter>Page footer</PageFooter>
        </SmallPage>
    `,
});
