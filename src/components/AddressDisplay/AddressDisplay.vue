<template>
    <component :is="copyable ? 'Copyable' : 'div'" :text="chunks.join(' ').toUpperCase()" class="address-display">
        <span v-for="(chunk, index) in chunks" class="chunk" :key="chunk + index">{{ chunk }}<span class="space">&nbsp;</span></span>
    </component>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core';
import Copyable from '../Copyable/Copyable.vue';

export default defineComponent({
    name: 'AddressDisplay',
    components: { Copyable },
    props: {
        address: { type: String, required: true },
        copyable: { type: Boolean, default: false },
    },
    setup(props) {
        const chunks = computed(() => {
            if (!props.address) return new Array(9).fill('-');
            return props.address.replace(/[+ ]/g, '').match(/.{4}/g)!;
        });

        return { chunks };
    }
})
</script>

<style scoped>
    .address-display {
        width: 100%;
        max-width: 28.25rem;
        box-sizing: content-box;
        font-family: 'Fira Mono', monospace;
        color: rgba(31, 35, 72, .5); /* nimiq-blue with .5 opacity */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        font-size: 3rem;
    }

    .address-display.copyable:hover,
    .address-display.copyable:focus,
    .address-display.copyable.copied {
        font-weight: 500;
    }

    .chunk {
        margin: 0.875rem 0;
        line-height: 1.11;
        width: 33%;
        text-align: center;
        box-sizing: border-box;
        text-transform: uppercase;
    }

    .space {
        font-size: 0;
    }
</style>
