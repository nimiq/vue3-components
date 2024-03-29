<template>
    <div class="page-header nq-card-header" :class="progressIndicator ? 'has-progress-indicator' : ''">
        <div v-if="progressIndicator" class="progress-indicator">
            <div v-for="thisStep in progressSteps" class="indicator" :class="thisStep <= step ? 'active' : ''" :key="thisStep"></div>
        </div>
        <a v-if="backArrow" href="#" class="page-header-back-button" @click.prevent="$emit(PageHeaderEvent.BACK)"
            :title="$t('Go back')">
            <ArrowLeftIcon/>
        </a>
        <h1 class="nq-h1"><slot></slot></h1>
        <slot name="more"></slot>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { loadI18n } from '../../i18n/I18nComposable';
import { ArrowLeftIcon } from '../../icons/Icons';

export enum PageHeaderEvent {
    BACK = 'back',
}

export default defineComponent({
    name: 'PageHeader',
    props: {
        backArrow: {
            type: Boolean,
            default: false,
        },
        progressIndicator: {
            type: Boolean,
            default: false,
        },
        numberSteps: {
            type: Number,
            default: 6,
        },
        step: {
            type: Number,
            default: 1,
        },
    },
    methods: { $t: loadI18n('PageHeader') },
    setup(props) {
        const progressSteps = computed(() => {
            const list = [];
            for (let i = 1; i <= props.numberSteps; i++) list.push(i);
            return list;
        });

        return {
            progressSteps,
            PageHeaderEvent,
        };
    },
    components: { ArrowLeftIcon },
})
</script>

<style scoped>
    .page-header {
        position: relative;
    }

    .page-header-back-button {
        font-size: 3rem;
        position: absolute;
        left: 4rem;
        padding-top: .25rem;
        opacity: 0.4;
        transition: opacity .3s var(--nimiq-ease), transform .3s var(--nimiq-ease);
        color: inherit;
    }

    .page-header-back-button svg {
        display: block;
    }

    .page-header-back-button:hover,
    .page-header-back-button:focus {
        opacity: 1;
        transform: translate3D(-0.375rem, 0, 0);
        outline: none;
    }

    @media (max-width: 450px) {
        .page-header-back-button,
        /* Don't move button left on mobile */
        .page-header-back-button:hover,
        .page-header-back-button:focus {
            left: 3rem;
            transform: none;
        }
    }

    .page-header-back-button::after {
        content: '';
        display: block;
        position: absolute;
        left: -1.5rem;
        top: -1.5rem;
        right: -1.5rem;
        bottom: -1.5rem;
    }

    .progress-indicator {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding: 0.5rem;
        position: absolute;
        left: 0;
        top: 0;
    }

    .progress-indicator .indicator {
        flex-grow: 1;
        height: 0.5rem;
        border-radius: 0.25rem;
        background: #e5e5e5;
        margin: 0.5rem;
    }

    .progress-indicator .indicator.active {
        background: #24bdb6;
    }

    .page-header.has-progress-indicator h1,
    .page-header.has-progress-indicator .page-header-back-button {
        margin-top: 1rem;
    }
</style>
