import { StyleValue } from '@vue/runtime-dom';
export declare enum TooltipVerticalPosition {
    TOP = "top",
    BOTTOM = "bottom"
}
export declare enum TooltipHorizontalPosition {
    LEFT = "left",
    RIGHT = "right"
}
export declare enum TooltipThemes {
    NORMAL = "normal",
    INVERSE = "inverse"
}
declare const _default: import("vue").DefineComponent<{
    /**
    * Container within which the tooltip should be positioned if possible.
    */
    container: {
        new (): HTMLElement;
        prototype: HTMLElement;
    };
    disabled: BooleanConstructor;
    noFocus: BooleanConstructor;
    /**
    * Preferred tooltip position as "[vertical] [horizontal]" or "[vertical]".
    */
    preferredPosition: {
        type: StringConstructor;
        default: string;
        validator: (value: unknown) => boolean;
    };
    /**
    * Margin to maintain to container. If no container is set, this prop has no effect. For omitted values, the
    * container's padding is used as margin.
    */
    margin: {
        type: () => Partial<Record<TooltipVerticalPosition | TooltipHorizontalPosition, number>>;
        validator: (value: any) => boolean;
    };
    /**
    * Sets the tooltip's width to the container's width minus margin. If no container is set, this prop has no effect.
    */
    autoWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: () => TooltipThemes;
        default: TooltipThemes.NORMAL;
        validator: (value: any) => boolean;
    };
    /**
    * Styles to apply on the tooltip box without the need to use deep css selectors.
    */
    styles: () => Partial<CSSStyleDeclaration>;
}, {
    TooltipThemes: typeof TooltipThemes;
    tooltipTrigger$: import("vue").Ref<HTMLAnchorElement | null>;
    tooltipBox$: import("vue").Ref<HTMLDivElement | null>;
    root$: import("vue").Ref<HTMLElement | null>;
    verticalPosition: import("vue").Ref<TooltipVerticalPosition | null>;
    transitionPosition: import("vue").Ref<boolean>;
    isShown: import("vue").ComputedRef<boolean>;
    tooltipBoxStyles: import("vue").ComputedRef<StyleValue>;
    show: () => void;
    hide: (force?: boolean) => void;
    mouseOver: (mouseOverTooltip: boolean) => void;
    onClick: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
    * Container within which the tooltip should be positioned if possible.
    */
    container: {
        new (): HTMLElement;
        prototype: HTMLElement;
    };
    disabled: BooleanConstructor;
    noFocus: BooleanConstructor;
    /**
    * Preferred tooltip position as "[vertical] [horizontal]" or "[vertical]".
    */
    preferredPosition: {
        type: StringConstructor;
        default: string;
        validator: (value: unknown) => boolean;
    };
    /**
    * Margin to maintain to container. If no container is set, this prop has no effect. For omitted values, the
    * container's padding is used as margin.
    */
    margin: {
        type: () => Partial<Record<TooltipVerticalPosition | TooltipHorizontalPosition, number>>;
        validator: (value: any) => boolean;
    };
    /**
    * Sets the tooltip's width to the container's width minus margin. If no container is set, this prop has no effect.
    */
    autoWidth: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: () => TooltipThemes;
        default: TooltipThemes.NORMAL;
        validator: (value: any) => boolean;
    };
    /**
    * Styles to apply on the tooltip box without the need to use deep css selectors.
    */
    styles: () => Partial<CSSStyleDeclaration>;
}>>, {
    disabled: boolean;
    noFocus: boolean;
    preferredPosition: string;
    autoWidth: boolean;
    theme: TooltipThemes;
}>;
export default _default;
