<template>
    <div class="copyable-field" :class="{ small }">
        <span class="nq-label" v-if="label">{{ label }}</span>
        <div class="copyable-field-content" :class="{ 'simple-value': !isKeyedValue, copied }" @click="copy">
            <div ref="valueContainer$" class="value-container" :style="{ fontSize: fontSize+'rem' }">
                <span ref="value$" class="value">
                    {{ typeof modelValue === 'object' ? modelValue[currentKey] : modelValue }}
                </span>
            </div>
            <button
                class="nq-button-s"
                v-for="key in (isKeyedValue ? Object.keys(modelValue) : [])"
                :key="key"
                @click.stop="currentKey = key"
                :class="{
                    inverse: currentKey === key,
                    'single-key': hasSingleKey,
                }"
                :tabindex="hasSingleKey ? -1 : 0"
            >{{key}}</button>
            <div class="copy-notice">{{ $t('Copied') }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from '@vue/runtime-core';
import { Clipboard } from '@nimiq/utils';
import { loadI18n } from '../../i18n/I18nComposable';

export const COPYABLE_FIELD_DEFAULT_FONT_SIZE = 3; // in rem
export const COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL = 2.5; // in rem

export default defineComponent({
    name: 'CopyableField',
    props: {
        modelValue: {
            type: Object as () => (string | number | { [key: string]: any }),
            required: true,
            validator: (value: string | object) => typeof value === 'string' || typeof value === 'number'
                || (typeof value === 'object' && Object.keys(value).length > 0),
        },
        label: String,
        small: {
            type: Boolean,
            default: false,
        },
    },
    methods: { $t: loadI18n('CopyableField') },
    setup(props) {
        const value$ = ref<HTMLSpanElement | null>(null);
        const valueContainer$ = ref<HTMLDivElement | null>(null);

        const currentKey = ref('');
        const fontSize = ref(props.small ? COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL : COPYABLE_FIELD_DEFAULT_FONT_SIZE);
        const copied = ref(false);
        const _copiedResetTimeout = ref<number | null>(null);

        onMounted(() => {
            // this._updateFontSize = this._updateFontSize.bind(this);
            window.addEventListener('resize', _updateFontSize);
            _updateFontSize();
        });

        onUnmounted(() => window.removeEventListener('resize', _updateFontSize));

        const isKeyedValue = computed(() => {
            return typeof props.modelValue !== 'string' && typeof props.modelValue !== 'number';
        });

        const hasSingleKey = computed(() => {
            return isKeyedValue.value && Object.keys(props.modelValue).length === 1;
        });

        watch(() => props.modelValue, _onValueChange, { immediate: true });
        function _onValueChange() {
            const keys = isKeyedValue.value ? Object.keys(props.modelValue) : [];
            if (keys.length > 0 && (!currentKey.value || !keys.includes(currentKey.value))) {
                currentKey.value = keys[0]; // will also trigger _updateFontSize
            } else {
                _updateFontSize(); // trigger manually
            }
        }

        watch(currentKey, _updateFontSize);
        watch(() => props.small, _updateFontSize);
        async function _updateFontSize() {
            await nextTick(); // let Vue render the component first
            if (!valueContainer$.value || !value$.value) return;

            const defaultFontSize = props.small ? COPYABLE_FIELD_DEFAULT_FONT_SIZE_SMALL : COPYABLE_FIELD_DEFAULT_FONT_SIZE;
            value$.value.style.fontSize = `${defaultFontSize}rem`;

            const availableWidth = valueContainer$.value.offsetWidth;
            const referenceWidth = value$.value.offsetWidth;
            const scaleFactor =  availableWidth / referenceWidth;
            value$.value.style.fontSize = '';
            fontSize.value = Math.min(defaultFontSize, defaultFontSize * scaleFactor);
        }

        function copy() {
            Clipboard.copy(
                isKeyedValue.value
                    ? (props.modelValue as { [key: string]: any })[currentKey.value].toString()
                    : props.modelValue.toString()
            );
            copied.value = true;

            if (_copiedResetTimeout.value) window.clearTimeout(_copiedResetTimeout.value);
            _copiedResetTimeout.value = window.setTimeout(() => {
                copied.value = false;
            }, 500);
        }

        return {
            value$,
            valueContainer$,

            currentKey,
            fontSize,
            copied,

            isKeyedValue,
            hasSingleKey,
            copy,
        };
    }
})
</script>

<style scoped>
    .copyable-field-content,
    .copy-notice,
    button,
    .simple-value .value-container {
        transition-duration: .25s;
        transition-timing-function: var(--nimiq-ease);
    }

    .copyable-field,
    .copyable-field-content {
        display: flex;
        width: 100%;
        align-items: center;
    }

    .copyable-field {
        flex-direction: column;
        justify-content: space-between;
        color: white;
    }

    .copyable-field-content {
        height: 6.25rem;
        position: relative;
        border-radius: 0.5rem;
        line-height: 6.25rem;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.1);
        transition-property: background;
    }

    .small .copyable-field-content {
        height: 5rem;
        line-height: 5rem;
    }

    .copy-notice {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 1.75rem;
        font-weight: 600;
        color: var(--nimiq-light-blue);
        pointer-events: none;
        opacity: 0;
        transition-property: opacity;
    }

    .copyable-field-content,
    .copy-notice {
        padding: 0 3rem;
    }

    .copyable-field-content:hover {
        background: rgba(255, 255, 255, 0.16);
    }

    .copied .copy-notice {
        opacity: 1;
    }

    button {
        margin-left: .5rem;
        transition-property: background, color, opacity;
    }

    button:first-of-type {
        margin-left: 2.5rem;
    }

    button:not(.inverse) {
        background: transparent;
    }

    button:not(.inverse):hover {
        background: rgba(255, 255, 255, .07);
    }

    button.inverse {
        color: white;
    }

    button.single-key {
        pointer-events: none;
        background: transparent;
    }

    .small button {
        height: 3rem;
        line-height: 3rem;
    }

    .copied button {
        opacity: 0;
    }

    .value-container {
        display: flex;
        align-items: center;
        flex-grow: 1;
        overflow-x: hidden; /* avoid overflow of the value while it's not resized yet */
        white-space: nowrap;
    }

    .simple-value .value-container {
        mask-image: linear-gradient(90deg, black 60%, transparent 80%);
        mask-size: 160%;
        transition-property: mask-size;
    }

    .simple-value.copied .value-container {
        mask-size: 100%;
    }

    .nq-button-s,
    .nq-label {
        color: rgba(255, 255, 255, 0.5);
    }

    .nq-label {
        margin-top: 3rem;
        margin-bottom: 2rem;
    }

    .small .nq-label {
        margin-top: 2.75rem;
        margin-bottom: 1.75rem;
    }
</style>
