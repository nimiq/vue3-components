import { AccountInfo, ContractInfo } from '../AccountSelector/AccountSelector.vue';
export declare enum AccountListEvent {
    ACCOUNT_SELECTED = "account-selected",
    ACCOUNT_CHANGED = "account-changed"
}
declare const _default: import("vue").DefineComponent<{
    accounts: {
        type: () => Array<AccountInfo | ContractInfo>;
        required: true;
    };
    disabledAddresses: {
        type: () => string[];
        default: () => never[];
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableContracts: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    walletId: StringConstructor;
    decimals: NumberConstructor;
    minBalance: NumberConstructor;
    tooltipProps: ObjectConstructor;
}, {
    highlightedDisabledAddress: import("vue").Ref<string | null>;
    highlightedDisabledAddressTimeout: import("vue").Ref<number>;
    accounts$: import("vue").Ref<Record<string, import("vue").DefineComponent<{
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
            default: import("../Account/Account.vue").AccountLayout;
            validator: (layout: any) => boolean;
        };
        editable: {
            type: BooleanConstructor;
            default: boolean;
        };
        address: StringConstructor;
        image: StringConstructor;
        placeholder: StringConstructor;
        walletLabel: StringConstructor;
        balance: NumberConstructor;
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
            LabelInputEvent: typeof import("../LabelInput/LabelInput.vue").LabelInputEvent;
        }, unknown, {}, {
            $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
        }, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("../LabelInput/LabelInput.vue").LabelInputEvent[], import("../LabelInput/LabelInput.vue").LabelInputEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
            onChanged?: ((...args: any[]) => any) | undefined;
            onPaste?: ((...args: any[]) => any) | undefined;
        }, {
            modelValue: string;
            vanishing: boolean;
            disabled: boolean;
        }> | null>;
        showImage: import("vue").Ref<boolean>;
        isNimiqAddress: () => boolean;
        isLabelNimiqAddress: () => boolean;
        onModelValueUpdate: (label: string) => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("../Account/Account.vue").AccountEvent.CHANGED[], import("../Account/Account.vue").AccountEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
            default: import("../Account/Account.vue").AccountLayout;
            validator: (layout: any) => boolean;
        };
        editable: {
            type: BooleanConstructor;
            default: boolean;
        };
        address: StringConstructor;
        image: StringConstructor;
        placeholder: StringConstructor;
        walletLabel: StringConstructor;
        balance: NumberConstructor;
    }>> & {
        onChanged?: ((...args: any[]) => any) | undefined;
    }, {
        decimals: number;
        displayAsCashlink: boolean;
        layout: string;
        editable: boolean;
    }>>>;
    tooltips$: import("vue").Ref<Record<string, import("vue").DefineComponent<{
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
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    }>>>;
    focus: (address: string) => void;
    accountSelected: (account: AccountInfo | ContractInfo) => void;
    onAccountChanged: (address: string, label: string) => void;
    isDisabled: (account: AccountInfo | ContractInfo) => boolean | 0 | undefined;
    isDisabledContract: (account: AccountInfo | ContractInfo) => boolean;
    isDisabledAccount: (account: AccountInfo | ContractInfo) => boolean;
    hasInsufficientBalance: (account: AccountInfo | ContractInfo) => boolean | 0 | undefined;
    hasTooltip: (account: AccountInfo | ContractInfo) => boolean;
    clearHighlightedDisabledAddress: () => void;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, AccountListEvent[], AccountListEvent, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    accounts: {
        type: () => Array<AccountInfo | ContractInfo>;
        required: true;
    };
    disabledAddresses: {
        type: () => string[];
        default: () => never[];
    };
    editable: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableContracts: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    walletId: StringConstructor;
    decimals: NumberConstructor;
    minBalance: NumberConstructor;
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
