declare type BigInteger = import('big-integer').BigInteger;
export declare function amountValidator(value: any): boolean;
declare const _default: import("vue").DefineComponent<{
    amount: {
        required: true;
        validator: typeof amountValidator;
        type: () => number | bigint | BigInteger;
    };
    decimals: NumberConstructor;
    minDecimals: {
        type: NumberConstructor;
        default: number;
    };
    maxDecimals: {
        type: NumberConstructor;
        default: number;
    };
    showApprox: {
        type: BooleanConstructor;
        default: boolean;
    };
    currency: {
        type: StringConstructor;
        default: string;
    };
    currencyDecimals: {
        type: NumberConstructor;
        default: number;
    };
}, {
    formattedAmount: import("vue").ComputedRef<string>;
    isApprox: import("vue").ComputedRef<boolean>;
    ticker: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    amount: {
        required: true;
        validator: typeof amountValidator;
        type: () => number | bigint | BigInteger;
    };
    decimals: NumberConstructor;
    minDecimals: {
        type: NumberConstructor;
        default: number;
    };
    maxDecimals: {
        type: NumberConstructor;
        default: number;
    };
    showApprox: {
        type: BooleanConstructor;
        default: boolean;
    };
    currency: {
        type: StringConstructor;
        default: string;
    };
    currencyDecimals: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    currency: string;
    minDecimals: number;
    maxDecimals: number;
    showApprox: boolean;
    currencyDecimals: number;
}>;
export default _default;
