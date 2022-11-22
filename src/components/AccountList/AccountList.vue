<template>
    <div class="account-list">
        <component :is="!isDisabled(account) && !editable ? 'a' : 'div'"
            href="javascript:void(0)"
            class="account-entry"
            v-for="account in accounts"
            :class="{
                'disabled': isDisabled(account),
                'has-tooltip': hasTooltip(account),
                'highlight-insufficient-balance': highlightedDisabledAddress === account.userFriendlyAddress
                    && hasInsufficientBalance(account)
                    && !isDisabledContract(account)
                    && !isDisabledAccount(account),
            }"
            @click="accountSelected(account)"
            :key="account.userFriendlyAddress"
        >
            <!-- account$ should be of type 'ComponentPublicInstance' imported from ‘vue', but types cannot be passed to template -->
            <Account :ref="(account$: any) => accounts$[account.userFriendlyAddress] = account$"
                :address="account.userFriendlyAddress"
                :label="account.label"
                :placeholder="/* TODO: account.defaultLabel does not exist on type AccountInfo*/ ''"
                :balance="minBalance ? account.balance : undefined"
                :decimals="decimals"
                :editable="editable && !disabled"
                @changed="onAccountChanged(account.userFriendlyAddress, $event)"
            />

            <CaretRightSmallIcon v-if="!isDisabled(account)" class="caret"/>
            <!-- tooltip$ should be of type 'ComponentPublicInstance' imported from ‘vue', but types cannot be passed to template -->
            <Tooltip v-if="hasTooltip(account)"
                :ref="(tooltip$: any) => tooltips$[`tooltip-${account.userFriendlyAddress}`] = tooltip$"
                v-bind="{
                    preferredPosition: 'bottom left',
                    ...tooltipProps,
                    styles: {
                        width: '22.25rem',
                        pointerEvents: 'none',
                        ...(tooltipProps ? tooltipProps.styles : undefined),
                    },
                }"
                @click.stop=""
            >
                {{ isDisabledContract(account)
                    ? $t('Contracts cannot be used for this operation.')
                    : $t('This address cannot be used for this operation.')
                }}
            </Tooltip>
        </component>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, ref } from 'vue'
import Account from '../Account/Account.vue';
import { AccountInfo, ContractInfo } from '../AccountSelector/AccountSelector.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import { CaretRightSmallIcon } from '../Icons';
import { loadI18n } from '../../i18n/I18nComposable';

export enum AccountListEvent {
    ACCOUNT_SELECTED = 'account-selected',
    ACCOUNT_CHANGED = 'account-changed',
}

export default defineComponent({
    name: 'AccountList',
    emits: Object.values(AccountListEvent),
    props: {
        accounts: {
            type: Array as () => Array<AccountInfo | ContractInfo>,
            required: true,
        },
        disabledAddresses: {
            type: Array as () => string[],
            default: () => [],
        },
        editable: {
            type: Boolean,
            default: false,
        },
        disableContracts: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        walletId: String,
        decimals: Number,
        minBalance: Number,
        tooltipProps: Object,
    },
    methods: { $t: loadI18n('AccountList') },
    setup: (props, context) => {
        const highlightedDisabledAddress = ref<string | null>(null);
        const highlightedDisabledAddressTimeout = ref(-1);

        const accounts$ = ref<Record<string, (typeof Account)>>({});
        const tooltips$ = ref<Record<string, (typeof Tooltip)>>({});

        onBeforeUpdate(() => {
            accounts$.value = {};
            tooltips$.value = {};
        });

        function focus(address: string) {
            if (props.editable && accounts$.value.hasOwnProperty(address)) {
                (accounts$.value[address] as (typeof Account)).focus();
            }
        }

        function accountSelected(account: AccountInfo | ContractInfo) {
            if (props.disabled || props.editable) return;

            window.clearTimeout(highlightedDisabledAddressTimeout.value);
            if (account.userFriendlyAddress !== highlightedDisabledAddress.value) {
                clearHighlightedDisabledAddress();
            }

            const isDisabledContractBool = isDisabledContract(account);
            const isDisabledAccountBool = isDisabledAccount(account);

            if (isDisabledContractBool
                || isDisabledAccountBool
                || hasInsufficientBalance(account)) {
                highlightedDisabledAddress.value = account.userFriendlyAddress;
                if (tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`]) {
                    tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`].show();
                }
                const waitTime = isDisabledContractBool || isDisabledAccountBool ? 2000 : 300;
                highlightedDisabledAddressTimeout.value =
                    window.setTimeout(() => clearHighlightedDisabledAddress(), waitTime);
            } else {
                context.emit(AccountListEvent.ACCOUNT_SELECTED, account.walletId || props.walletId, account.userFriendlyAddress);
            }
        }

        function onAccountChanged(address: string, label: string) {
            context.emit(AccountListEvent.ACCOUNT_CHANGED, address, label);
        }

        function isDisabled(account: AccountInfo | ContractInfo) {
            return props.disabled || (!props.editable
                && (isDisabledContract(account)
                || isDisabledAccount(account)
                || hasInsufficientBalance(account)));
        }

        function isDisabledContract(account: AccountInfo | ContractInfo) {
            return props.disableContracts && !('path' in account && account.path);
        }

        function isDisabledAccount(account: AccountInfo | ContractInfo) {
            return props.disabledAddresses.includes(account.userFriendlyAddress);
        }

        function hasInsufficientBalance(account: AccountInfo | ContractInfo) {
            return props.minBalance && (account.balance || 0) < props.minBalance;
        }

        function hasTooltip(account: AccountInfo | ContractInfo) {
            return !props.disabled && !props.editable
                && (isDisabledContract(account) || isDisabledAccount(account));
        }

        function clearHighlightedDisabledAddress() {
            if (!highlightedDisabledAddress.value) return;
            if (tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`]) {
                // Hide tooltip if it's not hovered
                (tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`] as (typeof Tooltip)).hide(/* force */ false);
            }
            highlightedDisabledAddress.value = null;
        }

        context.expose({ focus });

        return {
            highlightedDisabledAddress,
            highlightedDisabledAddressTimeout,
            accounts$,
            tooltips$,
            focus,
            accountSelected,
            onAccountChanged,
            isDisabled,
            isDisabledContract,
            isDisabledAccount,
            hasInsufficientBalance,
            hasTooltip,
            clearHighlightedDisabledAddress,
        };
    },
    components: {
        Account,
        CaretRightSmallIcon,
        Tooltip,
    },
})
</script>

<style scoped>
    .account-list {
        flex-grow: 1;
    }

    .account-entry {
        display: block;
        transition: background-color .3s var(--nimiq-ease);
        border-radius: 0.5rem;
        margin: 0.5rem 2rem;
        position: relative;
        color: inherit;
        text-decoration: none;
    }

    .account-entry:deep(.identicon img) {
        transform: scale(0.9);
        transition: transform .45s var(--nimiq-ease);
    }

    .account-entry:deep(.label),
    .account-entry:deep(.balance) {
        transition: opacity .3s var(--nimiq-ease), color .3s var(--nimiq-ease), margin-right .45s var(--nimiq-ease);
    }

    .account-entry .caret,
    .account-entry .tooltip {
        position: absolute;
        right: 2rem;
        top: 3.625rem;
        font-size: 2rem;
    }

    .account-entry .caret {
        transform: translateX(3rem);
        opacity: 0;
        transition: transform .45s var(--nimiq-ease), opacity .35s .1s var(--nimiq-ease);
    }

    a.account-entry:focus {
        outline: none;
    }

    a.account-entry:focus::after {
        content: "";
        position: absolute;
        left: -0.625rem;
        top: -0.625rem;
        right: -0.625rem;
        bottom: -0.625rem;
        border: 0.25rem solid rgba(5, 130, 202, 0.5); /* Based on Nimiq Light Blue */
        border-radius: 1rem;
        pointer-events: none;
    }

    a.account-entry:hover,
    a.account-entry:focus {
        background-color: rgba(31, 35, 72, 0.06); /* Based on Nimiq Blue */
    }

    a.account-entry:hover:deep(.identicon img),
    a.account-entry:focus:deep(.identicon img) {
        transform: scale(1);
    }

    a.account-entry:hover:deep(.label),
    a.account-entry:hover:deep(.balance),
    a.account-entry:focus:deep(.label),
    a.account-entry:focus:deep(.balance) {
        opacity: 1;
    }

    a.account-entry:hover:deep(.balance),
    a.account-entry:focus:deep(.balance),
    .account-entry.has-tooltip:deep(.balance) {
        margin-right: 3rem; /* make space for caret or tooltip trigger */
    }

    a.account-entry:hover:deep(.balance),
    a.account-entry:focus:deep(.balance) {
        color: var(--nimiq-green);
    }

    a.account-entry:hover .caret,
    a.account-entry:focus .caret {
        transform: translateX(0);
        opacity: 0.23;
    }

    .account-entry.disabled {
        cursor: not-allowed;
    }

    .account-entry.disabled:deep(.identicon),
    .account-entry.disabled:deep(.label),
    .account-entry.disabled:deep(.balance) {
        opacity: 0.2;
    }

    .account-entry.highlight-insufficient-balance:deep(.balance) {
        color: var(--nimiq-red);
        opacity: 1;
    }
</style>
