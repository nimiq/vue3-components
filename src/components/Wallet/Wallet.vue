<template>
    <div class="wallet">
        <AccountRing v-if="isMultiAddress" :addresses="addresses"/>
        <Identicon v-else :address="addresses[0]"/>

        <div class="wallet-description">
            <div class="label">{{ wallet.label }}</div>
            <div class="amount-container" :class="{'nq-orange': exportMissing}">
                <AlertTriangleIcon v-if="exportMissing"/>
                <Amount v-if="wallet.balance !== undefined" :amount="wallet.balance" :decimals="0"/>
            </div>
        </div>

        <button class="menu-toggle" @click.stop onclick="this.focus()">
            <MenuDotsIcon/>
            <div class="menu nq-blue-bg">
                <button v-if="isBip39" class="item export" @click="$emit('export-file', wallet.id)">
                    {{ $t('Save Login File') }}<AlertTriangleIcon v-if="fileMissing" class="nq-orange"/>
                </button>
                <button v-if="isKeyguard" class="item export" @click="$emit('export-words', wallet.id)">
                    {{ $t('Create Backup') }}<AlertTriangleIcon v-if="wordsMissing" class="nq-orange"/>
                </button>
                <button class="item" @click="$emit('rename', wallet.id)">{{ $t('Rename') }}</button>
                <button v-if="isKeyguard" class="item" @click="$emit('change-password', wallet.id)">{{ $t('Change Password') }}</button>
                <div class="separator"></div>
                <button class="item logout" @click="$emit('logout', wallet.id)"><ArrowRightSmallIcon/>{{ $t('Logout') }}</button>
            </div>
        </button>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';
import AccountRing from '../AccountRing/AccountRing.vue';
import Amount from '../Amount/Amount.vue';
import Identicon from '../Identicon/Identicon.vue';
import { AlertTriangleIcon, MenuDotsIcon, ArrowRightSmallIcon } from '../Icons';
import { loadI18n } from '../../i18n/I18nComposable';

/** @deprecated */
export default defineComponent({
    name: 'Wallet',
    props: {
        wallet: {
            type: Object as () => ({
                id: string,
                label: string,
                accounts: any[],
                type: number,
                fileExported: boolean,
                wordsExported: boolean,
                balance?: number,
            }),
            required: true,
        }
    },
    setup(props) {
        const $t = loadI18n('Wallet');

        const addresses = computed((): string[] => {
            return props.wallet.accounts
                .reduce((addresses: string[], account: any) => addresses.concat(account.address), []);
        });

        const isLegacy = computed(() => {
            return props.wallet.type === 1 /* LEGACY */;
        });

        const isBip39 = computed(() => {
            return props.wallet.type === 2 /* BIP39 */;
        });

        const isLedger = computed(() => {
            return props.wallet.type === 3 /* LEDGER */;
        })

        const isKeyguard = computed(() => {
            return isLegacy.value || isBip39.value;
        })

        const isMultiAddress = computed(() => {
            return isBip39.value || isLedger.value;
        });

        const fileMissing = computed(() => {
            return isBip39.value && !props.wallet.fileExported;
        });

        const wordsMissing = computed(() => {
            return (isBip39.value || isLegacy.value) && !props.wallet.wordsExported;
        });

        const exportMissing = computed(() => {
            return fileMissing.value || wordsMissing.value;
        });

        return {
            $t,
            addresses,
            isBip39,
            isKeyguard,
            isMultiAddress,
            fileMissing,
            wordsMissing,
            exportMissing,
        };
    },
    components: {
        AccountRing,
        Amount,
        Identicon,
        AlertTriangleIcon,
        MenuDotsIcon,
        ArrowRightSmallIcon,
    },
})
</script>

<style scoped>
    .wallet {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        height: 10rem;
    }

    .wallet-description {
        flex-grow: 1;
        min-width: 0;
    }

    .account-ring,
    .wallet > .identicon {
        width: 7rem;
        height: 7rem;
        margin-left: 2rem;
        margin-right: 1.5rem;
        flex-shrink: 0;
        user-select: none;
    }

    .wallet > .identicon {
        padding: 0 .375rem; /* Taking 3px off on both sides to reduce size while keeping alignment */
    }

    .label {
        font-weight: bold;
        font-size: 2.125rem;
        line-height: 3rem;
        white-space: nowrap;
        mask-image: linear-gradient(90deg , white, white calc(100% - 3rem), rgba(255,255,255, 0));
    }

    .amount-container {
        font-size: 1.75rem;
        font-weight: 600;
        line-height: 2rem;
        opacity: .5;
        display: flex;
    }

    .amount-container.nq-orange {
        opacity: 1;
    }

    .amount-container .nq-icon {
        margin-right: 1rem;
        font-size: 2rem;
    }

    .menu-toggle {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 0;
        width: 7rem;
        height: 100%;
        opacity: 0;
        pointer-events: none;
        font-family: inherit;
        transition: opacity .2s;
        outline: none;
        flex-shrink: 0;
    }

    .wallet:hover .menu-toggle,
    :focus .menu-toggle,
    .menu-toggle:focus,
    .menu-toggle:focus-within,
    .active .menu-toggle {
        opacity: 1;
        pointer-events: all;
    }

    .menu-toggle > .nq-icon {
        font-size: 3.75rem;
        opacity: .3;
        transition: opacity .2s;
    }

    .menu-toggle:hover > .nq-icon,
    .menu-toggle:focus > .nq-icon {
        opacity: .5;
    }

    .menu {
        display: none;
        position: absolute;
        right: 0;
        top: 0;
        list-style: none;
        padding: 1rem;
        border-radius: .5rem;
        z-index: 1;
        cursor: auto;
    }

    .menu-toggle:focus .menu,
    .menu-toggle:focus-within .menu,
    .menu:hover {
        display: block;
    }

    .menu .item {
        display: block;
        background: none;
        border: none;
        color: rgba(255, 255, 255, .6);
        font-family: inherit;
        text-align: left;
        cursor: pointer;
        font-size: 2rem;
        line-height: 3.75rem;
        font-weight: 600;
        width: 100%;
        padding: 0 1rem;
        margin-bottom: .75rem;
        transition: color .2s;
    }

    .menu .item:last-child {
        margin-bottom: 0;
    }

    .menu .item:hover,
    .menu .item:focus {
        color: white;
    }

    .menu .item:last-child:hover,
    .menu .item:last-child:focus {
        color: var(--nimiq-red);
    }

    .menu .item .nq-icon {
        vertical-align: middle;
        margin-bottom: .25rem;
    }

    .menu .export .nq-icon {
        margin-left: 1rem;
        color: var(--nimiq-orange);
    }

    .menu .logout .nq-icon {
        margin-right: 1rem;
    }

    .menu .separator {
        margin-top: 1.75rem;
        margin-bottom: 1rem;
        background: white;
        width: 100%;
        height: 1px;
        opacity: .1;
    }
</style>
