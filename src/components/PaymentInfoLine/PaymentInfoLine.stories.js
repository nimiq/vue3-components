import { ref } from 'vue';
import PaymentInfoLine, { PaymentInfoLineThemes } from './PaymentInfoLine.vue';

export default {
    title: 'PaymentInfoLine',
    component: PaymentInfoLine,
    argTypes: {
        cryptoAmount: { control: 'object' },
        fiatAmount: { control: 'object' },
        vendorMarkup: { control: 'number' },
        networkFee: { control: 'number' },
        origin: { control: 'text' },
        address: { control: 'text' },
        shopLogoUrl: { control: 'text' },
        startTime: { control: 'number' },
        endTime: { control: 'number' },
        theme: { control: { type: 'select', options: Object.values(PaymentInfoLineThemes) } },
        tooltipContainer: { control: 'object', table: { disable: true } },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { PaymentInfoLine },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        const tooltipContainer$ = ref(null);

        // Story args can be spread into the returned object
        return {
            ...args,
            tooltipContainer$,
        };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div style="max-width: 420px" :class="{ 'nq-blue-bg': theme === 'inverse' }" ref="tooltipContainer$">
            <PaymentInfoLine
                :cryptoAmount="cryptoAmount"
                :fiatAmount="fiatAmount"
                :vendorMarkup="vendorMarkup"
                :networkFee="networkFee"
                :origin="origin"
                :address="address"
                :shopLogoUrl="shopLogo"
                :startTime="startTime"
                :endTime="endTime"
                :theme="theme"
                :tooltipContainer="tooltipContainer$"
            />
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    theme: PaymentInfoLineThemes.NORMAL,
    cryptoAmount: {
        amount: 2179598,
        currency: 'NIM',
        decimals: 2,
    },
    fiatAmount: {
        amount: 25,
        currency: 'USD',
    },
    origin: 'https://shop.nimiq.com',
    address: 'NQ07 0000 00000000 0000 0000 0000 0000 0000',
    shopLogo: 'https://pbs.twimg.com/profile_images/1150268408287698945/x4f3ITmx_400x400.png',
    startTime: Date.now(),
};
