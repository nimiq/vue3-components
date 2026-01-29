import QrCreator from 'qr-creator';
export declare enum QrCodeErrorCorrection {
    L = "L",
    M = "M",
    H = "H",
    Q = "Q"
}
declare const _default: import("vue").DefineComponent<{
    data: StringConstructor;
    errorCorrection: {
        type: () => QrCodeErrorCorrection;
        default: QrCodeErrorCorrection;
        validator: (value: any) => boolean;
    };
    radius: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    fill: {
        type: (StringConstructor | (() => QrCreator.LinearGradient) | (() => QrCreator.RadialGradient))[];
        default: () => {
            type: string;
            position: number[];
            colorStops: (string | number)[][];
        };
        validator: (fill: Object) => boolean;
    };
    background: {
        type: StringConstructor;
        default: null;
        validator: (background: string) => boolean;
    };
    size: {
        type: NumberConstructor;
        default: number;
        validator: (size: number) => boolean;
    };
}, {
    data: string | undefined;
    canvas$: import("vue").Ref<HTMLCanvasElement | null>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: StringConstructor;
    errorCorrection: {
        type: () => QrCodeErrorCorrection;
        default: QrCodeErrorCorrection;
        validator: (value: any) => boolean;
    };
    radius: {
        type: NumberConstructor;
        default: number;
        validator: (value: number) => boolean;
    };
    fill: {
        type: (StringConstructor | (() => QrCreator.LinearGradient) | (() => QrCreator.RadialGradient))[];
        default: () => {
            type: string;
            position: number[];
            colorStops: (string | number)[][];
        };
        validator: (fill: Object) => boolean;
    };
    background: {
        type: StringConstructor;
        default: null;
        validator: (background: string) => boolean;
    };
    size: {
        type: NumberConstructor;
        default: number;
        validator: (size: number) => boolean;
    };
}>>, {
    fill: string | QrCreator.LinearGradient | QrCreator.RadialGradient;
    background: string;
    size: number;
    radius: number;
    errorCorrection: QrCodeErrorCorrection;
}>;
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
export default _default;
