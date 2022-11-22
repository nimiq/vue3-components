declare const _default: import("vue").DefineComponent<{
    amount: {
        type: NumberConstructor;
        required: true;
    };
    currency: {
        type: StringConstructor;
        required: true;
    };
    maxRelativeDeviation: {
        type: NumberConstructor;
        default: number;
    };
    hideDecimals: {
        type: BooleanConstructor;
        default: boolean;
    };
    locale: StringConstructor;
}, {
    currencyString: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    amount: {
        type: NumberConstructor;
        required: true;
    };
    currency: {
        type: StringConstructor;
        required: true;
    };
    maxRelativeDeviation: {
        type: NumberConstructor;
        default: number;
    };
    hideDecimals: {
        type: BooleanConstructor;
        default: boolean;
    };
    locale: StringConstructor;
}>>, {
    maxRelativeDeviation: number;
    hideDecimals: boolean;
}>;
export default _default;
