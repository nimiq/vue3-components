declare const _default: import("vue").DefineComponent<{
    entries: {
        type: () => string[];
        default: () => never[];
        validator: (entries: any) => boolean;
    };
    selected: StringConstructor;
    entryMargin: {
        type: NumberConstructor;
        default: number;
    };
    animationDuration: {
        type: NumberConstructor;
        default: number;
    };
    hideBackgroundEntries: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    root$: import("vue").Ref<HTMLDivElement | null>;
    refs$: import("vue").Ref<{
        [x: string]: HTMLElement;
    }>;
    effectiveSelected: import("vue").Ref<string>;
    _updateSelection: (newSelection: string | undefined) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    entries: {
        type: () => string[];
        default: () => never[];
        validator: (entries: any) => boolean;
    };
    selected: StringConstructor;
    entryMargin: {
        type: NumberConstructor;
        default: number;
    };
    animationDuration: {
        type: NumberConstructor;
        default: number;
    };
    hideBackgroundEntries: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    entries: string[];
    animationDuration: number;
    disabled: boolean;
    entryMargin: number;
    hideBackgroundEntries: boolean;
}>;
export default _default;
