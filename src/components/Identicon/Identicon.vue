<template>
    <div class="identicon">
        <img :src="dataUrl">
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { ValidationUtils } from '@nimiq/utils';
// @ts-expect-error Could not find a declaration file for module '@nimiq/identicons/dist/identicons.min.js'.
import Identicons from '@nimiq/identicons/dist/identicons.min.js';

import identiconRaw from '@nimiq/identicons/dist/identicons.min.svg?raw';
Identicons.svgPath = `data:text/plain;base64,${window.btoa(identiconRaw)}`;

export default defineComponent({
    name: 'Identicon',
    props: {
        address: {
            required: true,
            type: String,
        }
    },
    setup(props, context) {
        function formatAddress(str: string) {
            return str.replace(/[\+ ]/g, '').toUpperCase().match(/.{4}/g)!.join(' ');
        }

        function isUserFriendlyAddress(str: string) {
            return ValidationUtils.isValidAddress(str);
        }

        const placeholderDataUrl = computed(() => {
            // tslint:disable-next-line max-line-length
            return 'data:image/svg+xml,<svg width="64" height="64" viewBox="0 -4 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity=".1" d="M62.3 25.4L49.2 2.6A5.3 5.3 0 0 0 44.6 0H18.4c-1.9 0-3.6 1-4.6 2.6L.7 25.4c-1 1.6-1 3.6 0 5.2l13.1 22.8c1 1.6 2.7 2.6 4.6 2.6h26.2c1.9 0 3.6-1 4.6-2.6l13-22.8c1-1.6 1-3.6.1-5.2z" fill="url(%23identicon_radial)"/><defs><radialGradient id="identicon_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-63.0033 0 0 -56 63 56)"><stop stop-color="%23260133"/><stop offset="1" stop-color="%231F2348"/></radialGradient></defs></svg>';
        });

        const dataUrl = ref(placeholderDataUrl.value);

        watch(() => props.address, computeDataUrl, { immediate: true })
        async function computeDataUrl(address: string, oldAddress?: string) {
            if (props.address && isUserFriendlyAddress(props.address)) {
                // // Set svgPath
                // Identicons.svgPath = (await import('@nimiq/identicons/dist/identicons.min.svg?url')).default;

                dataUrl.value = await Identicons.toDataUrl(formatAddress(props.address));
            } else {
                dataUrl.value = placeholderDataUrl.value;
            }
            return true;
        }

        context.expose({
            formatAddress,
            isUserFriendlyAddress,
        });

        return { dataUrl };
    }
})
</script>

<style scoped>
    img {
        width: 100%;
        height: 100%;
    }
</style>
