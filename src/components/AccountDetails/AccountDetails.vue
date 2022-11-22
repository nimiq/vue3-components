<template>
    <div class="account-details">
        <CloseButton class="top-right" @click="onClose"/>
        <Account ref="account$"
            layout="column"
            :address="address"
            :image="image"
            :label="(label && label !== address) ? label : ''"
            :walletLabel="walletLabel"
            :balance="balance"
            :editable="editable"
            :placeholder="placeholder"
            @changed="onChanged"
        />
        <AddressDisplay :address="address" copyable />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Account from '../Account/Account.vue';
import Amount from '../Amount/Amount.vue';
import AddressDisplay from '../AddressDisplay/AddressDisplay.vue';
import CloseButton from '../CloseButton/CloseButton.vue';

export enum AccountDetailsEvent {
    CLOSE = 'close',
    CHANGED = 'changed',
}

export default defineComponent({
    name: 'AccountDetails',
    emits: Object.values(AccountDetailsEvent),
    props: {
        address: {
            type: String,
            required: true,
        },
        editable: {
            type: Boolean,
            default: false,
        },
        image: String,
        label: String,
        walletLabel: String,
        balance: Number,
        placeholder: String,
    },
    setup: (props, context) => {
        const account$ = ref<(typeof Account) | null>(null);

        function focus() {
            if (account$.value) account$.value.focus();
        }

        function onChanged(label: string) {
            context.emit(AccountDetailsEvent.CHANGED, label);
        }

        function onClose() {
            context.emit(AccountDetailsEvent.CLOSE);
        }

        context.expose({ focus });

        return {
            account$,
            onChanged,
            onClose,
        };
    },
    components: {
        Account,
        Amount,
        AddressDisplay,
        CloseButton,
    }
})

</script>

<style scoped>
    .account-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
        position: relative;
        /* background: rgba(255, 255, 255, 0.95); */
        padding: 4rem;
        border-radius: 1rem;
        width: 100%;
        height: 100%;
        z-index: 2;
        box-sizing: border-box;
    }

    .account {
        padding: 0;
        width: 100%;
    }

    .account:deep(.identicon-and-label) {
        width: 100%;
    }

    .account:deep(.identicon) {
        width: 18rem;
        height: 18rem;
        margin-bottom: 3rem;
    }

    .account:deep(.label) {
        font-size: 3rem;
        font-weight: 600;
        opacity: 1;
    }

    .account:deep(.wallet-label) {
        margin-top: .5rem;
    }

    .account:deep(.label),
    .account:deep(.wallet-label) {
        max-width: unset;
        max-height: unset;
    }

    .account:deep(.balance) {
        font-size: 3rem;
        margin-top: 3rem;
    }

    .address-display {
        margin-top: 3rem;
        margin-bottom: 1.5rem;
    }
</style>
