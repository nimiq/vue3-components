<template>
    <div class="account" :class="[{ editable }, layout, { cashlink: displayAsCashlink }]">
        <div class="identicon-and-label">
            <img v-if="showImage" class="identicon account-image" :src="image" @error="showImage = false">
            <div v-else-if="displayAsCashlink" class="identicon">
                <div class="nq-blue-bg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="white" stroke-linecap="round" stroke-width="2.5"><path d="M40.25 23.25v-.5a6.5 6.5 0 0 0-6.5-6.5h-3.5a6.5 6.5 0 0 0-6.5 6.5v6.5a6.5 6.5 0 0 0 6.5 6.5h2"/><path d="M23.75 40.75v.5a6.5 6.5 0 0 0 6.5 6.5h3.5a6.5 6.5 0 0 0 6.5-6.5v-6.5a6.5 6.5 0 0 0-6.5-6.5h-2"/><path d="M32 11.25v4M32 48.75v4"/></svg>
                </div>
            </div>
            <Identicon v-else-if="isNimiqAddress()" :address="address!"/>

            <div v-if="!editable" class="label" :class="{ 'address-font': isLabelNimiqAddress() }">{{ label }}</div>
            <div v-else class="label editable" :class="{ 'address-font': isLabelNimiqAddress() }">
                <LabelInput ref="label$"
                    :maxBytes="63"
                    :value="label"
                    :placeholder="placeholder"
                    @update:modelValue="onModelValueUpdate"
                />
            </div>

            <div v-if="layout === 'column' && walletLabel" class="nq-label wallet-label">{{ walletLabel }}</div>
        </div>

        <Amount v-if="balance || balance === 0" class="balance" :amount="balance" :decimals="decimals" />
    </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue'
import Identicon from '../Identicon/Identicon.vue';
import Amount from '../Amount/Amount.vue';
import LabelInput from '../LabelInput/LabelInput.vue';
import { ValidationUtils } from '@nimiq/utils';

export enum AccountEvent {
    CHANGED = 'changed',
}

export enum AccountLayout {
    ROW = 'row',
    COLUMN = 'column',
}

export default defineComponent({
    name: 'Account',
    emits: Object.values(AccountEvent),
    props: {
        label: {
            type: String,
            required: true,
        },
        displayAsCashlink: {
            type: Boolean,
            default: false,
        },
        decimals: {
            type: Number,
            default: 2,
        },
        layout: {
            type: String,
            default: AccountLayout.ROW,
            validator: (layout: any) => Object.values(AccountLayout).includes(layout),
        },
        editable: {
            type: Boolean,
            default: false,
        },
        address: String,
        image: String,
        placeholder: String,
        walletLabel: String,
        balance: Number,
    },
    setup: (props, context) => {
        const label$ = ref<(typeof LabelInput) | null>(null);
        const showImage: Ref<boolean> = ref(!!props.image);

        function focus() {
            if (props.editable && label$.value) {
                label$.value.focus();
            }
        }

        function onModelValueUpdate(label: string) {
            context.emit(AccountEvent.CHANGED, label);
        }

        watch(() => props.image, () => {
            showImage.value = !!props.image;
        }, { immediate: true });

        function isNimiqAddress() {
            return props.address ? ValidationUtils.isValidAddress(props.address) : false;
        }

        function isLabelNimiqAddress() {
            return ValidationUtils.isValidAddress(props.label);
        }

        context.expose({ focus });

        return {
            label$,
            showImage,
            isNimiqAddress,
            isLabelNimiqAddress,
            onModelValueUpdate,
        };
    },
    components: {
        Identicon,
        Amount,
        LabelInput
    }
})
</script>

<style scoped>
    .account {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.75rem 2rem;
        box-sizing: border-box;
        flex-shrink: 0;
        font-size: 2rem;
        line-height: 1.2;
        overflow: hidden; /* hide chevron right on hover*/
    }

    .account.row {
        width: 100%;
        flex-direction: row;
    }

    .account.column {
        flex-direction: column;
    }

    .identicon-and-label {
        display: flex;
        align-items: center;
    }

    .row .identicon-and-label {
        flex-direction: row;
        overflow: hidden;
        min-width: 5.625rem;
        flex-grow: 1;
    }

    .column .identicon-and-label {
        flex-direction: column;
    }

    .identicon {
        flex-shrink: 0;
        position: relative;
    }

    .row .identicon {
        width: 5.625rem;
        height: 5.625rem;
        margin-right: 1.5rem;
    }

    .column .identicon {
        width: 10rem;
        height: 10rem;
        margin-bottom: 1.25rem;
    }

    .cashlink .identicon {
        padding: .5rem;
    }

    .cashlink .identicon div {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .cashlink .identicon:before {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: .25rem solid rgba(31, 35, 72, .2); /* based on nimiq-blue */
    }

    .account-image {
        border-radius: 1rem;
    }

    .wallet-label {
        margin-bottom: 0;
    }

    .label,
    .wallet-label {
        overflow: hidden;
    }

    .row .label:not(.editable) {
        opacity: 0.7;
        padding-left: 1rem;
    }

    .row .label,
    .row .wallet-label {
        white-space: nowrap;
        font-weight: 600;
        mask-image: linear-gradient(90deg , white, white calc(100% - 3rem), rgba(255,255,255, 0));
    }

    .row .label {
        flex-grow: 1;
    }

    .column .label,
    .column .wallet-label {
        max-width: 18.5rem; /* 148px, the width the automatic labels are designed for */
        text-align: center;
        line-height: 1.5;
        /* TODO implement multi line ellipsis */
        max-height: calc(2 * 1em * 1.5); /* #lines * font-size * line-height */
    }

    .label.address-font {
        font-family: "Fira Mono", "Andale Mono", monospace;
        font-weight: normal;
        text-transform: uppercase;
    }

    .balance {
        flex-shrink: 0;
    }

    .row .balance {
        margin-left: 1rem;
        font-weight: bold;
        opacity: 0.7;
    }

    .column .balance {
        margin-top: 1.5rem;
    }
</style>
