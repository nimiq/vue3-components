import { action } from '@storybook/addon-actions';
import QrScanner from './QrScanner.vue';
import SmallPage from '../SmallPage/SmallPage.vue';

export default {
    title: 'QrScanner',
    component: QrScanner,
    argTypes: {
        reportFrequency: { control: 'number' },
        validate: { table: { disable: true } },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { QrScanner, SmallPage },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        // Story args can be spread into the returned object
        return { ...args, action };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <SmallPage style="height: 560px; overflow: hidden">
                <QrScanner style="height: 100%"
                    @result="action('result')($event)"
                    @cancel="action('cancel')($event)"
                    @error="action('error')($event)"
                ></QrScanner>
            </SmallPage>
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    reportFrequency: 7000,
};
