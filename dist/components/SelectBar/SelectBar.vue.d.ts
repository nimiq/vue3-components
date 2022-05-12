export interface SelectBarOption {
    color: string;
    value: number;
    text: string;
    index: number;
}
declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: true;
    };
    options: {
        type: () => SelectBarOption[];
        required: true;
    };
    selectedValue: NumberConstructor;
}, {
    sortedOptions: import("vue").ComputedRef<SelectBarOption[]>;
    selectedOption: import("vue").ComputedRef<SelectBarOption>;
    getColor: (option: SelectBarOption) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    options: {
        type: () => SelectBarOption[];
        required: true;
    };
    selectedValue: NumberConstructor;
}>>, {}>;
export default _default;
