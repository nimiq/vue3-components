declare type BigInteger = import('big-integer').BigInteger;
import { PropType } from 'vue';
import { amountValidator } from '../Amount/Amount.vue';
import { TooltipThemes } from '../Tooltip/Tooltip.vue';
declare function cryptoAmountInfoValidator(value: any): boolean;
declare function fiatAmountInfoValidator(value: any): boolean;
export declare enum PaymentInfoLineThemes {
    NORMAL = "normal",
    INVERSE = "inverse"
}
declare const _default: import("vue").DefineComponent<{
    cryptoAmount: {
        type: PropType<{
            amount: number;
            currency: string;
            decimals: number;
        }>;
        required: true;
        validator: typeof cryptoAmountInfoValidator;
    };
    fiatAmount: {
        type: PropType<{
            amount: number;
            currency: string;
        }>;
        validator: typeof fiatAmountInfoValidator;
    };
    vendorMarkup: {
        type: NumberConstructor;
        validator: (value: any) => boolean;
    };
    networkFee: {
        type: () => number | bigint | BigInteger;
        validator: typeof amountValidator;
    };
    origin: {
        type: StringConstructor;
        required: true;
    };
    address: StringConstructor;
    shopLogoUrl: StringConstructor;
    startTime: NumberConstructor;
    endTime: NumberConstructor;
    theme: {
        type: PropType<PaymentInfoLineThemes>;
        validator: (value: any) => boolean;
        default: string;
    };
    tooltipContainer: {
        new (): HTMLElement;
        prototype: HTMLElement;
    };
}, {
    PaymentInfoLineThemes: typeof PaymentInfoLineThemes;
    TooltipThemes: typeof TooltipThemes;
    timer$: import("vue").Ref<import("vue").DefineComponent<{
        startTime: NumberConstructor;
        endTime: NumberConstructor;
        alwaysShowTime: {
            type: BooleanConstructor;
            default: boolean;
        };
        theme: {
            type: StringConstructor;
            default: import("../Timer/Timer.vue").TimerThemes;
            validator: (value: any) => boolean;
        };
        strokeWidth: {
            type: NumberConstructor;
            default: number;
        };
        tooltipProps: ObjectConstructor;
        maxUnit: {
            type: StringConstructor;
            required: false;
            validator: (value: any) => boolean;
        };
    }, {
        toSimplifiedTime: {
            (millis: number, includeUnit?: true | undefined, maxUnit?: string | undefined): string;
            (millis: number, includeUnit: false, maxUnit?: string | undefined): number;
        };
        TooltipThemes: typeof TooltipThemes;
        TimerThemes: typeof import("../Timer/Timer.vue").TimerThemes;
        root$: import("vue").Ref<import("vue").DefineComponent<{
            container: {
                new (): HTMLElement;
                prototype: HTMLElement;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            noFocus: {
                type: BooleanConstructor;
                default: boolean;
            };
            preferredPosition: {
                type: StringConstructor;
                default: string;
                validator: (value: unknown) => boolean;
            };
            margin: {
                type: () => Partial<Record<import("../Tooltip/Tooltip.vue").TooltipVerticalPosition | import("../Tooltip/Tooltip.vue").TooltipHorizontalPosition, number>>;
                validator: (value: any) => boolean;
            };
            autoWidth: {
                type: BooleanConstructor;
                default: boolean;
            };
            theme: {
                type: () => TooltipThemes;
                default: TooltipThemes.NORMAL;
                validator: (value: any) => boolean;
            };
            styles: () => Partial<CSSStyleDeclaration>;
        }, {
            TooltipThemes: typeof TooltipThemes;
            tooltipTrigger$: import("vue").Ref<HTMLAnchorElement | null>;
            tooltipBox$: import("vue").Ref<HTMLDivElement | null>;
            root$: import("vue").Ref<HTMLElement | null>;
            verticalPosition: import("vue").Ref<import("../Tooltip/Tooltip.vue").TooltipVerticalPosition | null>;
            transitionPosition: import("vue").Ref<boolean>;
            isShown: import("vue").ComputedRef<boolean>;
            tooltipBoxStyles: import("vue").ComputedRef<import("vue").StyleValue>;
            show: () => void;
            hide: (force?: boolean) => void;
            mouseOver: (mouseOverTooltip: boolean) => void;
            onClick: () => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("../Tooltip/Tooltip.vue").TooltipEvents[], import("../Tooltip/Tooltip.vue").TooltipEvents, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            container: {
                new (): HTMLElement;
                prototype: HTMLElement;
            };
            disabled: {
                type: BooleanConstructor;
                default: boolean;
            };
            noFocus: {
                type: BooleanConstructor;
                default: boolean;
            };
            preferredPosition: {
                type: StringConstructor;
                default: string;
                validator: (value: unknown) => boolean;
            };
            margin: {
                type: () => Partial<Record<import("../Tooltip/Tooltip.vue").TooltipVerticalPosition | import("../Tooltip/Tooltip.vue").TooltipHorizontalPosition, number>>;
                validator: (value: any) => boolean;
            };
            autoWidth: {
                type: BooleanConstructor;
                default: boolean;
            };
            theme: {
                type: () => TooltipThemes;
                default: TooltipThemes.NORMAL;
                validator: (value: any) => boolean;
            };
            styles: () => Partial<CSSStyleDeclaration>;
        }>> & {
            onClick?: ((...args: any[]) => any) | undefined;
            onShow?: ((...args: any[]) => any) | undefined;
            onHide?: ((...args: any[]) => any) | undefined;
        }, {
            disabled: boolean;
            noFocus: boolean;
            preferredPosition: string;
            autoWidth: boolean;
            theme: TooltipThemes;
        }> | null>;
        detailsShown: import("vue").Ref<boolean>;
        radius: import("@nimiq/utils/dist/src/tweenable/Tweenable").default;
        timeLeftRef: import("vue").ComputedRef<number>;
        progress: import("vue").ComputedRef<number>;
        timeCircleInfo: import("vue").ComputedRef<import("../Timer/Timer.vue").CircleInfo>;
        fillerCircleInfo: import("vue").ComputedRef<import("../Timer/Timer.vue").CircleInfo>;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("../Timer/Timer.vue").TimerEvents.END[], import("../Timer/Timer.vue").TimerEvents, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        startTime: NumberConstructor;
        endTime: NumberConstructor;
        alwaysShowTime: {
            type: BooleanConstructor;
            default: boolean;
        };
        theme: {
            type: StringConstructor;
            default: import("../Timer/Timer.vue").TimerThemes;
            validator: (value: any) => boolean;
        };
        strokeWidth: {
            type: NumberConstructor;
            default: number;
        };
        tooltipProps: ObjectConstructor;
        maxUnit: {
            type: StringConstructor;
            required: false;
            validator: (value: any) => boolean;
        };
    }>> & {
        onEnd?: ((...args: any[]) => any) | undefined;
    }, {
        strokeWidth: number;
        theme: string;
        alwaysShowTime: boolean;
    }> | null>;
    priceTooltip$: import("vue").Ref<import("vue").DefineComponent<{
        container: {
            new (): HTMLElement;
            prototype: HTMLElement;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        noFocus: {
            type: BooleanConstructor;
            default: boolean;
        };
        preferredPosition: {
            type: StringConstructor;
            default: string;
            validator: (value: unknown) => boolean;
        };
        margin: {
            type: () => Partial<Record<import("../Tooltip/Tooltip.vue").TooltipVerticalPosition | import("../Tooltip/Tooltip.vue").TooltipHorizontalPosition, number>>;
            validator: (value: any) => boolean;
        };
        autoWidth: {
            type: BooleanConstructor;
            default: boolean;
        };
        theme: {
            type: () => TooltipThemes;
            default: TooltipThemes.NORMAL;
            validator: (value: any) => boolean;
        };
        styles: () => Partial<CSSStyleDeclaration>;
    }, {
        TooltipThemes: typeof TooltipThemes;
        tooltipTrigger$: import("vue").Ref<HTMLAnchorElement | null>;
        tooltipBox$: import("vue").Ref<HTMLDivElement | null>;
        root$: import("vue").Ref<HTMLElement | null>;
        verticalPosition: import("vue").Ref<import("../Tooltip/Tooltip.vue").TooltipVerticalPosition | null>;
        transitionPosition: import("vue").Ref<boolean>;
        isShown: import("vue").ComputedRef<boolean>;
        tooltipBoxStyles: import("vue").ComputedRef<import("vue").StyleValue>;
        show: () => void;
        hide: (force?: boolean) => void;
        mouseOver: (mouseOverTooltip: boolean) => void;
        onClick: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("../Tooltip/Tooltip.vue").TooltipEvents[], import("../Tooltip/Tooltip.vue").TooltipEvents, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
        container: {
            new (): HTMLElement;
            prototype: HTMLElement;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        noFocus: {
            type: BooleanConstructor;
            default: boolean;
        };
        preferredPosition: {
            type: StringConstructor;
            default: string;
            validator: (value: unknown) => boolean;
        };
        margin: {
            type: () => Partial<Record<import("../Tooltip/Tooltip.vue").TooltipVerticalPosition | import("../Tooltip/Tooltip.vue").TooltipHorizontalPosition, number>>;
            validator: (value: any) => boolean;
        };
        autoWidth: {
            type: BooleanConstructor;
            default: boolean;
        };
        theme: {
            type: () => TooltipThemes;
            default: TooltipThemes.NORMAL;
            validator: (value: any) => boolean;
        };
        styles: () => Partial<CSSStyleDeclaration>;
    }>> & {
        onClick?: ((...args: any[]) => any) | undefined;
        onShow?: ((...args: any[]) => any) | undefined;
        onHide?: ((...args: any[]) => any) | undefined;
    }, {
        disabled: boolean;
        noFocus: boolean;
        preferredPosition: string;
        autoWidth: boolean;
        theme: TooltipThemes;
    }> | null>;
    lastTooltipToggle: import("vue").Ref<number>;
    originDomain: import("vue").ComputedRef<string>;
    effectiveRate: import("vue").ComputedRef<number | null>;
    formattedVendorMarkup: import("vue").ComputedRef<string | null>;
    isFormattedNetworkFeeZero: import("vue").ComputedRef<boolean>;
    isBadRate: import("vue").ComputedRef<boolean | 0 | undefined>;
    rateInfo: () => string | null;
    onPriceTooltipToggle: (isShow: boolean) => void;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    cryptoAmount: {
        type: PropType<{
            amount: number;
            currency: string;
            decimals: number;
        }>;
        required: true;
        validator: typeof cryptoAmountInfoValidator;
    };
    fiatAmount: {
        type: PropType<{
            amount: number;
            currency: string;
        }>;
        validator: typeof fiatAmountInfoValidator;
    };
    vendorMarkup: {
        type: NumberConstructor;
        validator: (value: any) => boolean;
    };
    networkFee: {
        type: () => number | bigint | BigInteger;
        validator: typeof amountValidator;
    };
    origin: {
        type: StringConstructor;
        required: true;
    };
    address: StringConstructor;
    shopLogoUrl: StringConstructor;
    startTime: NumberConstructor;
    endTime: NumberConstructor;
    theme: {
        type: PropType<PaymentInfoLineThemes>;
        validator: (value: any) => boolean;
        default: string;
    };
    tooltipContainer: {
        new (): HTMLElement;
        prototype: HTMLElement;
    };
}>>, {
    theme: PaymentInfoLineThemes;
}>;
export default _default;
