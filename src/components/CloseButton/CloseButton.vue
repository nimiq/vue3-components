<template>
    <button class="close-button nq-button-s" @click="onClick" @mousedown.prevent>
        <CloseIcon/>
    </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import { CloseIcon } from '../Icons';

export default defineComponent({
    name: 'CloseButton',
    setup(props, context) {
        function onClick(event: MouseEvent) {
            context.emit('click', event);
        }

        return { onClick };
    },
    components: {
        CloseIcon,
    }
})
</script>

<style scoped>
    button {
        font-size: 3rem;
        padding: 0;
        background: none !important;
        height: 3rem;
    }

    button::before {
        border-radius: 50%;
    }

    button .nq-icon {
        opacity: .2;
        transition: opacity .3s var(--nimiq-ease);
    }

    button:hover .nq-icon,
    button:active .nq-icon,
    button:focus .nq-icon {
        opacity: .4;
    }

    button.top-right {
        position: absolute;
        top: 2rem;
        right: 2rem;
    }
</style>
