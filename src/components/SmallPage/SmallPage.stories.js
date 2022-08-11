import SmallPage from './SmallPage.vue';

export default {
    title: 'SmallPage',
    component: SmallPage,
    argTypes: {},
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { SmallPage },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <SmallPage>
                <PageHeader :backArrow="true">
                    Page header
                    <p slot="more" class="nq-notice info">I am an informative notice!</p>
                </PageHeader>
                <PageBody>
                    <p>Some text in the page body.</p>
                </PageBody>
                <PageFooter>Page footer</PageFooter>
            </SmallPage>
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {};
