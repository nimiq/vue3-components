<template>
    <component :is="copyable ? 'Copyable' : 'div'" :text="text" class="address-display" :class="`format-${format}`">
        <span v-for="(chunk, index) in chunks" class="chunk" :key="chunk + index">{{ chunk }}<span v-if="chunkTrailingSpaces" class="space">&nbsp;</span></span>
    </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Copyable from '../Copyable/Copyable.vue';

export default defineComponent({
    name: 'AddressDisplay',
    components: { Copyable },
    props: {
        address: {
            type: String,
            required: true,
        },
        format: {
            type: String as () => 'nimiq' | 'ethereum',
            default: 'nimiq',
        },
        copyable: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const chunks = computed(() => {
            switch (props.format) {
                case 'nimiq':
                    if (!props.address) return new Array(9).fill('-');
                    return props.address.replace(/[+ ]/g, '').match(/.{4}/g)!;
                case 'ethereum':
                    if (!props.address) return new Array(3).fill('-');
                    return props.address.replace(/[+ ]/g, '').match(/.{14}/g)!;
                default:
                    return [props.address];
            }
        });

        const text = computed(() => {
            switch (props.format) {
                case 'nimiq': return chunks.value.join(' ').toUpperCase();
                default: return chunks.value.join('');
            }
        });

        const chunkTrailingSpaces = computed(() => props.format === 'nimiq');

        return { chunks, text, chunkTrailingSpaces };
    },
})
</script>

<style scoped>
    .address-display {
        width: 100%;
        box-sizing: content-box;
        color: rgba(31, 35, 72, .5); /* nimiq-blue with .5 opacity */
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        font-size: 3rem;
    }

    .format-nimiq {
        max-width: 28.25rem;
    }

    .format-ethereum {
        max-width: 27rem;
    }

    .address-display.copyable:hover,
    .address-display.copyable:focus,
    .address-display.copyable.copied {
        font-weight: 500;
    }

    .chunk {
        font-family: 'Fira Mono', monospace;
        margin: 0.875rem 0;
        line-height: 1.11;
        text-align: center;
        box-sizing: border-box;
    }

    .format-nimiq .chunk {
        width: 33%;
        text-transform: uppercase;
    }

    .format-ethereum .chunk {
        width: 100%;
    }

    .space {
        font-size: 0;
    }
</style>
