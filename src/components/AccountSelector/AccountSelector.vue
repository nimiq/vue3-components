<template>
    <div class="account-selector">
        <div ref="container$" class="container" :class="{'extra-spacing': wallets.length === 1}">
            <div v-for="wallet in sortedWallets" :key="wallet.id">
                <div v-if="wallets.length > 1 || _isAccountDisabled(wallet)" class="wallet-label">
                    <div class="nq-label">
                        {{ wallet.label }}
                        <span v-if="highlightBitcoinAccounts && wallet.btcXPub" class="btc-pill">BTC</span>
                    </div>
                    <!-- tooltip$ should be of type 'ComponentPublicInstance' imported from ‘vue', but types cannot be passed to template -->
                    <Tooltip
                        v-if="_isAccountDisabled(wallet)"
                        :ref="(tooltip$: any) => tooltips$[`tooltip-${wallet.id}`] = tooltip$"
                        :margin="tooltipProps.margin"
                        :container="tooltipProps.container || undefined"
                        :preferredPosition="tooltipProps.preferredPosition"
                        :styles="{ width: '25.25rem', ...tooltipProps.styles }"
                    >
                        {{ $t(
                            '{type} accounts cannot be used for this operation.',
                            { type: _getAccountTypeName(wallet)},
                        ) }}
                    </Tooltip>
                </div>
                <AccountList
                    :accounts="sortAccountsAndContracts(listAccountsAndContracts(wallet), minBalance, disableContracts, disabledAddresses)"
                    :disabledAddresses="disabledAddresses"
                    :walletId="wallet.id"
                    :minBalance="minBalance"
                    :decimals="decimals"
                    :disableContracts="disableContracts"
                    :disabled="_isAccountDisabled(wallet)"
                    :tooltipProps="tooltipProps"
                    @account-selected="onAccountSelected"
                    @click="_accountClicked(wallet)"
                />
            </div>
        </div>

        <div class="footer">
            <button v-if="allowLogin" class="nq-button-s" @click="onLogin">{{ $t('Login to another account') }}</button>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUpdate, ref } from '@vue/runtime-core';
import AccountList from '../AccountList/AccountList.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import { loadI18n } from '../../i18n/I18nComposable';


// This is a reduced list of properties, for convenience
export interface ContractInfo {
    label: string;
    userFriendlyAddress: string;
    balance?: number;
    walletId?: string;
}

export interface AccountInfo {
    path: string;
    label: string;
    // address: Nimiq.Address; // Nimiq namespace is not known and not used by @nimiq/vue-components
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

export default defineComponent({
    name: 'AccountSelector',
    components: { AccountList, Tooltip },
    props: {
        wallets: {
            type: Array as () => WalletInfo[],
            required: true,
        },
        disabledAddresses: {
            type: Array as () => string[],
            default: () => [],
        },
        allowLogin: {
            type: Boolean,
            default: true,
        },
        decimals: Number,
        minBalance: Number,
        disableContracts: Boolean,
        disableLegacyAccounts: Boolean,
        disableBip39Accounts: Boolean,
        disableLedgerAccounts: Boolean,
        highlightBitcoinAccounts: Boolean,
    },
    setup: (props, context) => {
        const $t = loadI18n('AccountSelector');

        const container$ = ref<HTMLElement | null>(null);
        const tooltips$ = ref<Record<string, (typeof Tooltip)>>({});

        onBeforeUpdate(() => tooltips$.value = {});

        const shownTooltip = ref<typeof Tooltip | null>(null);
        const hideTooltipTimeout = ref(-1);
        const tooltipProps = ref({
            get container() { return container$.value } ,
            preferredPosition: 'bottom right',
            margin: {
                left: 16,
                right: 16,
                top: 32, // avoid that tooltips get affected by mask image
                bottom: 32,
            },
            styles: {
                pointerEvents: 'none',
            },
        });

        const sortedWallets = computed<WalletInfo[]>(() => {
            return props.wallets.slice(0).sort((a: WalletInfo, b: WalletInfo): number => {
                const aDisabled = _isAccountDisabled(a);
                const bDisabled = _isAccountDisabled(b);

                if (aDisabled && !bDisabled) return 1;
                if (!aDisabled && bDisabled) return -1;

                if (!props.minBalance) return 0; // don't sort by balance if no minBalance required

                const hasAddressWithSufficientBalance = (accounts: Map<string, AccountInfo>, contracts: ContractInfo[]) =>
                    Array.from(accounts.values()).some((account) => (account.balance || 0) >= (props.minBalance || 0))
                        || (!props.disableContracts && contracts.some((contract) => (contract.balance || 0) >= (props.minBalance || 0)));

                const aHasAddressWithSufficientBalance = hasAddressWithSufficientBalance(a.accounts, a.contracts);
                const bHasAddressWithSufficientBalance = hasAddressWithSufficientBalance(b.accounts, b.contracts);

                if (!aHasAddressWithSufficientBalance && bHasAddressWithSufficientBalance) return 1;
                if (aHasAddressWithSufficientBalance && !bHasAddressWithSufficientBalance) return -1;

                return 0;
            });
        });

        function onAccountSelected(walletId: string, address: string) {
            context.emit('account-selected', { walletId, address });
        }

        function onLogin() {
            context.emit('login');
        }

        function _isAccountDisabled(account: WalletInfo): boolean {
            return props.disableLegacyAccounts && account.type === 1 /* LEGACY */
                || props.disableBip39Accounts && account.type === 2 /* BIP39 */
                || props.disableLedgerAccounts && account.type === 3 /* LEDGER */;
        }

        function _getAccountTypeName(account: WalletInfo): string {
            switch (account.type) {
                case 1: return $t('Legacy');
                case 2: return 'Keyguard';
                case 3: return 'Ledger';
                default: throw new Error(`Unknown account type ${account.type}`);
            }
        }

        function _accountClicked(account: WalletInfo) {
            window.clearTimeout(hideTooltipTimeout.value);

            const tooltip = tooltips$.value[`tooltip-${account.id}`]
                ? tooltips$.value[`tooltip-${account.id}`][0]
                : null;

            if (shownTooltip.value && shownTooltip.value !== tooltip) {
                shownTooltip.value.hide(/* force */ false);
            }

            if (tooltip) {
                tooltip.show();
                hideTooltipTimeout.value = window.setTimeout(() => {
                    tooltip.hide(/* force */ false);
                    shownTooltip.value = null;
                }, 2000);
            }

            shownTooltip.value = tooltip;
        }

        function listAccountsAndContracts(wallet: WalletInfo): Array<AccountInfo|ContractInfo> {
            return [ ...wallet.accounts.values(), ...wallet.contracts ];
        }

        function sortAccountsAndContracts(
            accounts: Array<AccountInfo | ContractInfo>,
            minBalance?: number,
            disableContracts?: boolean,
            disabledAddresses?: string[],
        ): Array<AccountInfo | ContractInfo> {
            if (!minBalance) return accounts;

            return accounts.sort((a: AccountInfo|ContractInfo, b: AccountInfo|ContractInfo): number => {
                // sort disabled contracts to the end
                const aIsDisabledContract = disableContracts && !('path' in a && a.path);
                const bIsDisabledContract = disableContracts && !('path' in b && b.path);
                if (aIsDisabledContract && !bIsDisabledContract) return 1;
                if (!aIsDisabledContract && bIsDisabledContract) return -1;

                // sort disabled addresses below other addresses
                const aIsDisabledAddress = disabledAddresses && disabledAddresses.includes(a.userFriendlyAddress);
                const bIsDisabledAddress = disabledAddresses && disabledAddresses.includes(b.userFriendlyAddress);
                if (aIsDisabledAddress && !bIsDisabledAddress) return 1;
                if (!aIsDisabledAddress && bIsDisabledAddress) return -1;

                // sort accounts with insufficient funds below accounts with enough balance
                if ((!a.balance || a.balance < minBalance) && b.balance && b.balance >= minBalance) return 1;
                if ((!b.balance || b.balance < minBalance) && a.balance && a.balance >= minBalance) return -1;

                return 0;
            });
        }

        return {
            $t,
            container$,
            tooltips$,
            tooltipProps,
            sortedWallets,
            onAccountSelected,
            onLogin,
            listAccountsAndContracts,
            sortAccountsAndContracts,
            _isAccountDisabled,
            _getAccountTypeName,
            _accountClicked,
        };
    }
})
</script>

<style scoped>
    .account-selector {
        overflow: auto;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 400px;
    }

    .container {
        overflow-y: auto;
        padding-top: 0.5rem;
        padding-bottom: 4rem;
        flex-grow: 1;
        mask-image: linear-gradient(0deg , rgba(255,255,255,0), rgba(255,255,255, 1) 4rem,
            rgba(255,255,255,1) calc(100% - 4rem), rgba(255,255,255,0));
    }

    .container.extra-spacing {
        padding-top: 3rem;
    }

    .wallet-label {
        margin: 3.5rem 2rem 2rem 3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .wallet-label .nq-label {
        margin: 0;
    }

    .wallet-label .tooltip {
        margin-left: 1rem;
    }

    .wallet-label::after {
        content: '';
        display: block;
        flex-grow: 1;
        height: 1px;
        margin-left: 2rem;
        background: rgba(31, 35, 72, 0.1);
    }

    .btc-pill {
        background: #F7931A; /* Bitcoin orange */
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
        padding: 0.25rem 0.75rem;
        border-radius: 2rem;
        margin-left: 0.25rem;
    }

    .footer {
        padding: 4rem 0 3rem;
        margin-top: -4rem;
        text-align: center;
    }

    .nq-button-s {
        margin: auto;
        pointer-events: all;
    }
</style>
