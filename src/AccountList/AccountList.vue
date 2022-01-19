<template>
    <div class="account-list">
        <component :is="!_isDisabled(account) && !editable ? 'a' : 'div'"
            href="javascript:void(0)"
            class="account-entry"
            v-for="account in accounts"
            :class="{
                'disabled': _isDisabled(account),
                'has-tooltip': _hasTooltip(account),
                'highlight-insufficient-balance': highlightedDisabledAddress === account.userFriendlyAddress
                    && _hasInsufficientBalance(account)
                    && !_isDisabledContract(account)
                    && !_isDisabledAccount(account),
            }"
            @click="accountSelected(account)"
            :key="account.userFriendlyAddress"
        >
            <Account :ref="account$ => accounts$[account.userFriendlyAddress] = account$"
                :address="account.userFriendlyAddress"
                :label="account.label"
                :placeholder="account.defaultLabel"
                :balance="minBalance ? account.balance : undefined"
                :decimals="decimals"
                :editable="editable && !disabled"
                @changed="onAccountChanged(account.userFriendlyAddress, $event)"
            />

            <CaretRightSmallIcon v-if="!_isDisabled(account)" class="caret"/>
            <Tooltip v-if="_hasTooltip(account)"
                :ref="tooltip$ => tooltips$[`tooltip-${account.userFriendlyAddress}`] = tooltip$"
                v-bind="{
                    preferredPosition: 'bottom left',
                    ...tooltipProps,
                    styles: {
                        width: '22.25rem',
                        pointerEvents: 'none',
                        ...(tooltipProps ? tooltipProps.styles : undefined),
                    },
                }"
                @click.stop
            >
                {{ _isDisabledContract(account)
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
import I18nMixin from '../i18n/I18nMixin';

export default defineComponent({
    name: 'AccountList',
    extends: I18nMixin,
    props: {
        accounts: {
            type: Array as () => AccountInfo[],
            required: true,
        },
        disabledAddresses: {
            type: Array as () => string[],
            default: () => [],
        },
        walletId: String,
        editable: Boolean,
        decimals: Number,
        minBalance: Number,
        disableContracts: Boolean,
        disabled: Boolean,
        tooltipProps: Object,
    },
    setup: (props, context) => {
        const highlightedDisabledAddress = ref<string | null>(null);
        const highlightedDisabledAddressTimeout = ref(-1);

        const accounts$ = ref<Record<string, (typeof Account)>>({});
        const tooltips$ = ref<Record<string, (typeof Tooltip)>>({});

        function focus(address: string) {
            if (props.editable && accounts$.value.hasOwnProperty(address)) {
                (accounts$.value[address] as (typeof Account)).focus();
            }
        }

        onBeforeUpdate(() => {
            accounts$.value = {};
            tooltips$.value = {};
        });

        function accountSelected(account: AccountInfo) {
            if (props.disabled || props.editable) return;

            window.clearTimeout(highlightedDisabledAddressTimeout.value);
            if (account.userFriendlyAddress !== highlightedDisabledAddress.value) {
                _clearHighlightedDisabledAddress();
            }

            const isDisabledContract = _isDisabledContract(account);
            const isDisabledAccount = _isDisabledAccount(account);
            if (isDisabledContract
                || isDisabledAccount
                || _hasInsufficientBalance(account)) {
                highlightedDisabledAddress.value = account.userFriendlyAddress;
                if (tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`]) {
                    tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`].show();
                }
                const waitTime = isDisabledContract || isDisabledAccount ? 2000 : 300;
                highlightedDisabledAddressTimeout.value =
                    window.setTimeout(() => _clearHighlightedDisabledAddress(), waitTime);
            } else {
                context.emit('account-selected', account.walletId || props.walletId, account.userFriendlyAddress);
            }
        }

        function onAccountChanged(address: string, label: string) {
            context.emit('account-changed', address, label);
        }

        function _isDisabled(account: AccountInfo | ContractInfo) {
            return props.disabled || (!props.editable
                && (_isDisabledContract(account)
                || _isDisabledAccount(account)
                || _hasInsufficientBalance(account)));
        }

        function _isDisabledContract(account: AccountInfo | ContractInfo) {
            return props.disableContracts && !('path' in account && account.path);
        }

        function _isDisabledAccount(account: AccountInfo | ContractInfo) {
            return props.disabledAddresses.includes(account.userFriendlyAddress);
        }

        function _hasInsufficientBalance(account: AccountInfo | ContractInfo) {
            return props.minBalance && (account.balance || 0) < props.minBalance;
        }

        function _hasTooltip(account: AccountInfo | ContractInfo) {
            return !props.disabled && !props.editable
                && (_isDisabledContract(account) || _isDisabledAccount(account));
        }

        function _clearHighlightedDisabledAddress() {
            if (!highlightedDisabledAddress.value) return;
            if (tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`]) {
                // Hide tooltip if it's not hovered
                (tooltips$.value[`tooltip-${highlightedDisabledAddress.value}`] as (typeof Tooltip)).hide(/* force */ false);
            }
            highlightedDisabledAddress.value = null;
        }

        return {
            highlightedDisabledAddress,
            highlightedDisabledAddressTimeout,
            accounts$,
            tooltips$,
            focus,
            accountSelected,
            onAccountChanged,
            _isDisabled,
            _isDisabledContract,
            _isDisabledAccount,
            _hasInsufficientBalance,
            _hasTooltip,
            _clearHighlightedDisabledAddress,
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

    .account-entry >>> .identicon img {
        transform: scale(0.9);
        transition: transform .45s var(--nimiq-ease);
    }

    .account-entry >>> .label,
    .account-entry >>> .balance {
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

    a.account-entry:hover >>> .identicon img,
    a.account-entry:focus >>> .identicon img {
        transform: scale(1);
    }

    a.account-entry:hover >>> .label,
    a.account-entry:hover >>> .balance,
    a.account-entry:focus >>> .label,
    a.account-entry:focus >>> .balance {
        opacity: 1;
    }

    a.account-entry:hover >>> .balance,
    a.account-entry:focus >>> .balance,
    .account-entry.has-tooltip >>> .balance {
        margin-right: 3rem; /* make space for caret or tooltip trigger */
    }

    a.account-entry:hover >>> .balance,
    a.account-entry:focus >>> .balance {
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

    .account-entry.disabled >>> .identicon,
    .account-entry.disabled >>> .label,
    .account-entry.disabled >>> .balance {
        opacity: 0.2;
    }

    .account-entry.highlight-insufficient-balance >>> .balance {
        color: var(--nimiq-red);
        opacity: 1;
    }
</style>
