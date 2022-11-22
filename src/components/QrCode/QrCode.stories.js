import { action } from '@storybook/addon-actions';
import QrCode, { QrCodeErrorCorrection } from './QrCode.vue';

export default {
    title: 'QrCode',
    component: QrCode,
    argTypes: {
        // Props
        data: { control: { type: 'text' } },
        errorCorrection: {
            options: Object.values(QrCodeErrorCorrection),
            control: { type: 'select' }
        },
        radius: {
            control: {
                type: 'range',
                min: 0,
                max: .5,
                step: .01,
            }
        },
        fill: { control: { type: 'color' } },
        background: { control: { type: 'color' } },
        size: { control: { type: 'number' } },
    },
};

const Template = (args) => ({
    components: { QrCode },
    methods: {
        async toDataUrl() {
            action('dataUrl')(await this.$refs['qr-code'].toDataUrl());
        }
    },
    setup() {
        return { args };
    },
    template: `
        <button @click="toDataUrl">Export to Data Url</button>
        <br />
        <br />
        <QrCode ref="qr-code" v-bind="args"/>
    `,
});

export const Default = Template.bind({});
Default.args = {
    data: 'TEST-DATA',
    radius: .5,
    fill: '#0582ca',
    background: '#ffffff',
    size: 128,
};
