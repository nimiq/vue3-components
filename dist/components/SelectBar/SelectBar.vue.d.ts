import { PropType } from 'vue';
export interface SelectBarOption {
    color: string;
    value: number;
    text: string;
    index: number;
}
export declare enum SelectBarEvent {
    CHANGED = "changed"
}
declare const _default: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: true;
    };
    options: {
        type: PropType<SelectBarOption[]>;
        required: true;
    };
    selectedValue: NumberConstructor;
}, {
    sortedOptions: import("vue").ComputedRef<SelectBarOption[]>;
    selectedOption: import("vue").Ref<{
        color: string;
        value: number;
        text: string;
        index: number;
    }>;
    getColor: (option: SelectBarOption) => string;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, SelectBarEvent.CHANGED[], SelectBarEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    options: {
        type: PropType<SelectBarOption[]>;
        required: true;
    };
    selectedValue: NumberConstructor;
}>> & {
    onChanged?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _default;
