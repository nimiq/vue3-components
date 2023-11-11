import { Tweenable } from '@nimiq/utils';
import { TooltipThemes } from '../Tooltip/Tooltip.vue';
export interface CircleInfo {
    length: number;
    lengthWithLineCaps: number;
    gap: number;
    offset: number;
    strokeWidth: number;
}
declare function toSimplifiedTime(millis: number, includeUnit?: true, maxUnit?: string): string;
declare function toSimplifiedTime(millis: number, includeUnit: false, maxUnit?: string): number;
export declare enum TimerEvents {
    END = "end"
}
export declare enum TimerThemes {
    NORMAL = "normal",
    INVERSE = "inverse",
    WHITE = "white"
}
declare const _default: import("vue").DefineComponent<{
    startTime: NumberConstructor;
    endTime: NumberConstructor;
    alwaysShowTime: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: StringConstructor;
        default: TimerThemes;
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
    toSimplifiedTime: typeof toSimplifiedTime;
    TooltipThemes: typeof TooltipThemes;
    TimerThemes: typeof TimerThemes;
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
    radius: Tweenable;
    timeLeftRef: import("vue").ComputedRef<number>;
    progress: import("vue").ComputedRef<number>;
    timeCircleInfo: import("vue").ComputedRef<CircleInfo>;
    fillerCircleInfo: import("vue").ComputedRef<CircleInfo>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, TimerEvents.END[], TimerEvents, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    startTime: NumberConstructor;
    endTime: NumberConstructor;
    alwaysShowTime: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: StringConstructor;
        default: TimerThemes;
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
}>;
export default _default;
