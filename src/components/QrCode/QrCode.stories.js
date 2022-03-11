import { action } from '@storybook/addon-actions';
import { ref } from 'vue';
import QrCode from './QrCode.vue';

export default {
    title: 'QrCode',
    component: QrCode,
    argTypes: {
        data: { control: { type: 'text' } },
        errorCorrection: {
            options: ['L', 'M', 'H', 'Q'],
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
    },
    args: {
        data: 'TEST-DATA',
        errorCorrection: 'M',
        radius: .5,
        fill: '#0582ca',
        background: '#ffffff',
        size: 128,
    }
};

export const Default = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { QrCode },
    methods: {
        async toDataUrl() {
            action('dataUrl')(await this.$refs['qr-code'].toDataUrl());
        }
    },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        const dataUrl = ref('');

        // Story args can be spread into the returned object
        return { ...args, dataUrl };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <button @click="toDataUrl">Export to Data Url</button>
        <br />
        <br />
        <QrCode ref="qr-code"
            :data="data" :errorCorrection="errorCorrection" :radius="parseFloat(radius)" :fill="fill"
            :background="background" :size="parseInt(size)"/>
    `,
});
