export interface ContractInfo {
    label: string;
    userFriendlyAddress: string;
    balance?: number;
    walletId?: string;
}
export interface AccountInfo {
    path: string;
    label: string;
    userFriendlyAddress: string;
    balance?: number;
    walletId?: string;
}
export interface WalletInfo {
    id: string;
    label: string;
    accounts: Map<string, AccountInfo>;
    contracts: ContractInfo[];
    type: number;
    keyMissing: boolean;
    btcXPub?: string;
}
declare const _default: import("vue").DefineComponent<{
    wallets: {
        type: () => WalletInfo[];
        required: true;
    };
    disabledAddresses: {
        type: () => string[];
        default: () => never[];
    };
    allowLogin: {
        type: BooleanConstructor;
        default: boolean;
    };
    decimals: NumberConstructor;
    minBalance: NumberConstructor;
    disableContracts: BooleanConstructor;
    disableLegacyAccounts: BooleanConstructor;
    disableBip39Accounts: BooleanConstructor;
    disableLedgerAccounts: BooleanConstructor;
    highlightBitcoinAccounts: BooleanConstructor;
}, {
    container$: import("vue").Ref<HTMLElement | null>;
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
    tooltipProps: import("vue").Ref<{
        readonly container: HTMLElement | null;
        preferredPosition: string;
        margin: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        styles: {
            pointerEvents: string;
        };
    }>;
    sortedWallets: import("vue").ComputedRef<WalletInfo[]>;
    onAccountSelected: (walletId: string, address: string) => void;
    onLogin: () => void;
    listAccountsAndContracts: (wallet: WalletInfo) => Array<AccountInfo | ContractInfo>;
    sortAccountsAndContracts: (accounts: Array<AccountInfo | ContractInfo>, minBalance?: number | undefined, disableContracts?: boolean | undefined, disabledAddresses?: string[] | undefined) => Array<AccountInfo | ContractInfo>;
    _isAccountDisabled: (account: WalletInfo) => boolean;
    _getAccountTypeName: (account: WalletInfo) => string;
    _accountClicked: (account: WalletInfo) => void;
}, unknown, {}, {
    $t: (key: string, variablesOrLang?: string | import("../../i18n/I18nComposable").I18n$tVariables | undefined, variables?: import("../../i18n/I18nComposable").I18n$tVariables | undefined) => string;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("account-selected" | "login")[], "account-selected" | "login", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    wallets: {
        type: () => WalletInfo[];
        required: true;
    };
    disabledAddresses: {
        type: () => string[];
        default: () => never[];
    };
    allowLogin: {
        type: BooleanConstructor;
        default: boolean;
    };
    decimals: NumberConstructor;
    minBalance: NumberConstructor;
    disableContracts: BooleanConstructor;
    disableLegacyAccounts: BooleanConstructor;
    disableBip39Accounts: BooleanConstructor;
    disableLedgerAccounts: BooleanConstructor;
    highlightBitcoinAccounts: BooleanConstructor;
}>> & {
    "onAccount-selected"?: ((...args: any[]) => any) | undefined;
    onLogin?: ((...args: any[]) => any) | undefined;
}, {
    disabledAddresses: string[];
    disableContracts: boolean;
    allowLogin: boolean;
    disableLegacyAccounts: boolean;
    disableBip39Accounts: boolean;
    disableLedgerAccounts: boolean;
    highlightBitcoinAccounts: boolean;
}>;
export default _default;
