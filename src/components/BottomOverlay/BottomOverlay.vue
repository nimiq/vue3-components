<template>
    <div class="bottom-overlay" :class="[theme, { 'has-close-button': hasCloseButton }]">
        <slot></slot>
        <CloseButton v-if="hasCloseButton"
            class="close-button"
            :class="{ 'inverse': [BottomOverlayTheme.DARK, BottomOverlayTheme.GREEN].includes(theme as any) }"
            @click="onClose"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, getCurrentInstance } from 'vue';
import CloseButton from '../CloseButton/CloseButton.vue';

export enum BottomOverlayEvent {
    CLOSE = 'close',
}

export enum BottomOverlayTheme {
    DARK = 'dark',
    LIGHT = 'light',
    GREEN = 'green',
}

export default defineComponent({
    name: 'BottomOverlay',
    emits: Object.values(BottomOverlayEvent),
    props: {
        theme: {
            type: String,
            default: BottomOverlayTheme.DARK,
            validator: (theme: any) => typeof theme === 'string'
                && Object.values(BottomOverlayTheme).includes(theme as any),
        }
    },
    setup(props, context) {
        const hasCloseButton = ref(false);

        function onClose() {
            context.emit(BottomOverlayEvent.CLOSE);
        }

        async function onListenerChange() {
            /* This was using `context.attrs.onClose` with vue2 instead of `getCurrentInstance()?.vnode.props?.onClose`,
            ** but when migrating to vue3 and setting the emits property on the component the onClose attrs stayed empty,
            ** even though detecting changes to it and triggerring the watcher.
            **
            ** Not setting the emits seems to fix the issue, but that is not the recommended way of doing it.
            ** We thus went with this solution of directly getting the onClose attribute from the vnode instance directly,
            ** but if we find a better way to do it in the future, it would be preferable over this hacky solution.
            **
            ** Previous version: `hasCloseButton.value = !!context.attrs.onClose;`
            */
            hasCloseButton.value = !!getCurrentInstance()?.vnode.props?.onClose;
        }

        watch(() => context.attrs.onClose, onListenerChange, { immediate: true });

        return {
            hasCloseButton,
            onClose,
            BottomOverlayTheme,
        };
    },
    components: {
        CloseButton,
    },
})
</script>

<style scoped>
    .bottom-overlay {
        position: fixed;
        left: 50%;
        bottom: 2rem;
        max-width: 110rem;
        padding: 1.5rem 2rem 1.75rem 2rem;
        border-radius: 1.25rem;
        box-shadow: 0 0 2.5rem rgba(0, 0, 0, 0.111158);
        font-size: 2rem;
        line-height: 1.3;
        transform: translateX(-50%);
    }

    .dark {
        background: var(--nimiq-blue);
        color: white;
    }

    .light {
        background: white;
        color: var(--nimiq-blue);
    }

    .green {
        background: var(--nimiq-green);
        color: white;
    }

    .has-close-button {
        padding-right: 6.5rem;
    }

    .close-button {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
    }

    .green .close-button:deep(.nq-icon) {
        opacity: 0.4;
    }

    .green .close-button:hover:deep(.nq-icon),
    .green .close-button:focus:deep(.nq-icon) {
        opacity: 0.7;
    }

    @media (max-width: 912px) {
        .bottom-overlay {
            bottom: 1.5rem;
            width: calc(100% - 3rem);
        }
    }

    @media (max-width: 450px) {
        .bottom-overlay {
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 2.5rem;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            transform: none;
        }

        .has-close-button {
            padding-right: 7rem;
        }

        .close-button {
            top: 2rem;
            right: 2rem;
        }
    }
</style>
