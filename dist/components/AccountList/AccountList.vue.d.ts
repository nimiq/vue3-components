import { AccountInfo, ContractInfo } from '../AccountSelector/AccountSelector.vue';
declare const _default: import("vue").DefineComponent<{
    accounts: {
        type: () => Array<AccountInfo | ContractInfo>;
        required: true;
    };
    disabledAddresses: {
        type: () => string[];
        default: () => never[];
    };
    walletId: StringConstructor;
    editable: BooleanConstructor;
    decimals: NumberConstructor;
    minBalance: NumberConstructor;
    disableContracts: BooleanConstructor;
    disabled: BooleanConstructor;
    tooltipProps: ObjectConstructor;
}, {
    highlightedDisabledAddress: import("vue").Ref<string | null>;
    highlightedDisabledAddressTimeout: import("vue").Ref<number>;
    accounts$: import("vue").Ref<{
        [x: string]: import("vue").DefineComponent<{
            label: {
                type: StringConstructor;
                required: true;
            };
            displayAsCashlink: {
                type: BooleanConstructor;
                default: boolean;
            };
            decimals: {
                type: NumberConstructor;
                default: number;
            };
            layout: {
                type: StringConstructor;
                default: string;
                validator: (layout: any) => boolean;
            };
            address: StringConstructor;
            image: StringConstructor;
            placeholder: StringConstructor;
            walletLabel: StringConstructor;
            balance: NumberConstructor;
            editable: BooleanConstructor;
        }, {
            label$: import("vue").Ref<import("vue").DefineComponent<{
                maxBytes: NumberConstructor;
                modelValue: {
                    type: StringConstructor;
                    default: string;
                };
                placeholder: StringConstructor;
                vanishing: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                disabled: {
                    type: BooleanConstructor;
                    default: boolean;
                };
            }, {
                input$: import("vue").Ref<HTMLInputElement | null>;
                widthPlaceholder$: import("vue").Ref<HTMLSpanElement | null>;
                widthValue$: import("vue").Ref<HTMLSpanElement | null>;
                liveValue: import("vue").Ref<string>;
                width: import("vue").Ref<number>;
                onInput: () => void;
                onBlur: () => void;
            }, unknown, {}, {
                $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
            }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("paste" | "update:modelValue" | "changed")[], "paste" | "update:modelValue" | "changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
                maxBytes: NumberConstructor;
                modelValue: {
                    type: StringConstructor;
                    default: string;
                };
                placeholder: StringConstructor;
                vanishing: {
                    type: BooleanConstructor;
                    default: boolean;
                };
                disabled: {
                    type: BooleanConstructor;
                    default: boolean;
                };
            }>> & {
                onPaste?: ((...args: any[]) => any) | undefined;
                "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
                onChanged?: ((...args: any[]) => any) | undefined;
            }, {
                disabled: boolean;
                modelValue: string;
                vanishing: boolean;
            }> | null>;
            showImage: import("vue").Ref<boolean>;
            isNimiqAddress: () => boolean;
            isLabelNimiqAddress: () => boolean;
            onInput: (label: string) => void;
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "changed"[], "changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            label: {
                type: StringConstructor;
                required: true;
            };
            displayAsCashlink: {
                type: BooleanConstructor;
                default: boolean;
            };
            decimals: {
                type: NumberConstructor;
                default: number;
            };
            layout: {
                type: StringConstructor;
                default: string;
                validator: (layout: any) => boolean;
            };
            address: StringConstructor;
            image: StringConstructor;
            placeholder: StringConstructor;
            walletLabel: StringConstructor;
            balance: NumberConstructor;
            editable: BooleanConstructor;
        }>> & {
            onChanged?: ((...args: any[]) => any) | undefined;
        }, {
            layout: string;
            decimals: number;
            displayAsCashlink: boolean;
            editable: boolean;
        }>;
    }>;
    tooltips$: import("vue").Ref<{
        [x: string]: import("vue").DefineComponent<{
            container: {
                new (): HTMLElement;
                prototype: HTMLElement;
            };
            disabled: BooleanConstructor;
            noFocus: BooleanConstructor;
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
                type: () => import("../Tooltip/Tooltip.vue").TooltipThemes;
                default: import("../Tooltip/Tooltip.vue").TooltipThemes.NORMAL;
                validator: (value: any) => boolean;
            };
            styles: () => Partial<CSSStyleDeclaration>;
        }, {
            TooltipThemes: typeof import("../Tooltip/Tooltip.vue").TooltipThemes;
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
        }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
            container: {
                new (): HTMLElement;
                prototype: HTMLElement;
            };
            disabled: BooleanConstructor;
            noFocus: BooleanConstructor;
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
                type: () => import("../Tooltip/Tooltip.vue").TooltipThemes;
                default: import("../Tooltip/Tooltip.vue").TooltipThemes.NORMAL;
                validator: (value: any) => boolean;
            };
            styles: () => Partial<CSSStyleDeclaration>;
        }>>, {
            disabled: boolean;
            noFocus: boolean;
            preferredPosition: string;
            autoWidth: boolean;
            theme: import("../Tooltip/Tooltip.vue").TooltipThemes;
        }>;
    }>;
    focus: (address: string) => void;
    accountSelected: (account: AccountInfo | ContractInfo) => void;
    onAccountChanged: (address: string, label: string) => void;
    _isDisabled: (account: AccountInfo | ContractInfo) => boolean | 0 | undefined;
    _isDisabledContract: (account: AccountInfo | ContractInfo) => boolean;
    _isDisabledAccount: (account: AccountInfo | ContractInfo) => boolean;
    _hasInsufficientBalance: (account: AccountInfo | ContractInfo) => boolean | 0 | undefined;
    _hasTooltip: (account: AccountInfo | ContractInfo) => boolean;
    _clearHighlightedDisabledAddress: () => void;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("account-selected" | "account-changed")[], "account-selected" | "account-changed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    accounts: {
        type: () => Array<AccountInfo | ContractInfo>;
        required: true;
    };
    disabledAddresses: {
        type: () => string[];
        default: () => never[];
    };
    walletId: StringConstructor;
    editable: BooleanConstructor;
    decimals: NumberConstructor;
    minBalance: NumberConstructor;
    disableContracts: BooleanConstructor;
    disabled: BooleanConstructor;
    tooltipProps: ObjectConstructor;
}>> & {
    "onAccount-selected"?: ((...args: any[]) => any) | undefined;
    "onAccount-changed"?: ((...args: any[]) => any) | undefined;
}, {
    disabled: boolean;
    editable: boolean;
    disabledAddresses: string[];
    disableContracts: boolean;
}>;
export default _default;
