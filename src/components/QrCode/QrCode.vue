<template>
    <canvas ref="canvas$" v-if="!!data" class="qr-code"></canvas>
</template>

<script lang="ts">
import { defineComponent, watch, nextTick, ref } from 'vue'

import QrCreator from 'qr-creator';

export enum QrCodeErrorCorrection {
    L = 'L',
    M = 'M',
    H = 'H',
    Q = 'Q',
}

/**
 * **Nimiq QR Code Component**
 *
 * Props:
 *
 * **data** {string} The data to render
 *
 * **errorCorrection** {'L', 'M', 'H', 'Q'} [optional, default: 'M'] Error correction level according to QR specs
 *
 * **radius** {number} [optional, default .5] Roundness of QR code modules. Recommended value: .5
 *
 * **fill** {string|LinearGradient|RadialGradient} [optional, default '#0582ca' (nimiq-light-blue)] Fill of QR code
 *
 * **background** {string|null} [optional, default null] Background color of QR code. null means transparent.
 *
 * **size** {number} [optional, default 240] Width and height of QR code
 *
 * The QR encoder lib itself is lazy loaded as a webpack chunk when the data is set. If you want to use the QrCode
 * component in your project, you should copy the chunk from the dist folder over to your project.
 */
export default defineComponent({
    name: 'QrCode',
    props: {
        data: String,
        errorCorrection: {
            type: String as () => QrCodeErrorCorrection,
            default: QrCodeErrorCorrection.M,
            validator: (value: any) => Object.values(QrCodeErrorCorrection).includes(value)
        },
        radius: {
            type: Number,
            default: .5,
            validator: (value: number) => value >= 0 && value <= 1
        },
        fill: {
            type: [String, Object as () => QrCreator.LinearGradient, Object as () => QrCreator.RadialGradient],
            default: () => ({ // default equivalent to nimiq-light-blue-bg
                type: 'radial-gradient',
                // circle centered in bottom right corner with radius of the size of qr code diagonal
                position: [1, 1, 0, 1, 1, Math.sqrt(2)],
                colorStops: [
                    [0, '#265DD7'],
                    [1, '#0582CA'], // nimiq-light-blue
                ],
            }),
            validator: (fill: Object) => {
                const isValidColor = (c: unknown) => typeof(c) === 'string' && /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(c);

                if (isValidColor(fill)) return true;

                const gradient = (fill as QrCreator.LinearGradient | QrCreator.RadialGradient);
                const isValidGradient = ((gradient.type === 'linear-gradient' && gradient.position.length === 4)
                    || (gradient.type === 'radial-gradient' && gradient.position.length === 6))
                    && gradient.position.every((coordinate) => typeof coordinate === 'number');

                if (!isValidGradient) return false;

                const hasValidGradientStops = gradient.colorStops.length >= 2
                    && gradient.colorStops.every(([offset, color]) => typeof(offset) === 'number' && isValidColor(color));

                return hasValidGradientStops;
            },
        },
        background: {
            type: String,
            default: null,
            validator: (background: string) => background === null || /^#([0-9a-f]{6}|[0-9a-f]{8})$/i.test(background)
        },
        size: {
            type: Number,
            default: 240,
            validator: (size: number) => size > 0,
        },
    },
    setup(props, context) {
        const canvas$ = ref<HTMLCanvasElement | null>(null);

        async function toDataUrl(type = 'image/png') {
            await nextTick(); // Make sure the canvas is in the DOM (it depends on !!data)
            if (!props.data || !canvas$.value) return 'data:,';
            return canvas$.value.toDataURL(type);
        }

        watch([
            () => props.data,
            () => props.errorCorrection,
            () => props.radius,
            () => props.fill,
            () => props.background,
            () => props.size,
        ], async () => {
            await nextTick(); // Make sure the canvas is in the DOM (it depends on !!data)
            if (!props.data || !canvas$.value) return;
            QrCreator.render({
                text: props.data,
                radius: props.radius,
                ecLevel: props.errorCorrection,
                fill: props.fill,
                background: props.background,
                size: props.size,
            }, canvas$.value);
        }, { immediate: true });

        context.expose({
            toDataUrl,
        });

        return {
            data: props.data,
            canvas$,
        };
    }
})
</script>
